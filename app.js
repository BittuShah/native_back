// Main Dependencies
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

//  Graphql
const graphqlHttp = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const { GetErrorCode } = require("./utils/getError");

// External Libraries
const bodyParser = require("body-parser");
const multer = require("multer");

// Db Connection and Models
const dbConnection = require("./startup/db");
const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Images = require("./models/Images");

// Routes
const authRoutes = require("./routes/auth");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const upload = multer({ fileStorage });
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("images", 10)
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  console.log("Hello World!");
  res.status(200).send("Done!");
});

app.use("/auth", authRoutes);

app.put("/post-image", (req, res, next) => {
  console.log("File: ", req.files);

  console.log("Product: ", req.body);

  const product_id = parseInt(req.body.product_id);

  req.files.map(async (file) => {
    console.log("Path : ", file.path);

    const savedImage = await Images.create({
      image_src: file.path,
      productProductId: product_id,
    });
  });

  // if (!req.body.image) {
  //   console.log("File", req.file);

  //   console.log("Body", req.body);

  //   return res.status(200).send("No File Provided!");
  // }

  // console.log("File", req.file);

  // console.log("Body", req.body);

  // if (req.body.oldPath) {
  //   clearImage(req.body.oldPath);
  // }

  return res.status(201).json({ message: "File stored.", filePath: req.files });
});

app.use("/graphql", (req, res) => {
  graphqlHttp.graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    customFormatErrorFn: (err) => {
      // console.log(err.message);
      const error = GetErrorCode(err.message);
      // console.log(error);
      return { message: error.message, statusCode: error.statusCode };
    },
  })(req, res);
});

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
Category.hasOne(Product);
// Category.belongsToMany(Product, { constraints: true, onDelete: "CASCADE" });
Product.hasMany(Images, { constraints: true, onDelete: "CASCADE" });

dbConnection
  .sync()
  .then((result) => console.log(result))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on Port ${port}...!`));
