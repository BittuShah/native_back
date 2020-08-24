const Category = require("../models/Category");
const User = require("../models/User");
const Product = require("../models/Product");
const { use } = require("../routes/auth");
const Images = require("../models/Images");
const { CreateJWTToken } = require("../utils/createToken");
const { AuthUser } = require("../utils/verifyToken");
const { errorName } = require("../utils/constants");

module.exports = {
  hello() {
    return {
      text: "Hello world!",
      views: 1245,
    };
  },

  createCategory: async function (args, req) {
    const name = args.categoryInput.name;
    const icon = args.categoryInput.icon;

    let newCategory;

    const existingCategory = await Category.findOne({ where: { name: name } });

    if (existingCategory === null) {
      newCategory = await Category.create({
        name: name,
        icon: icon,
      });
      // console.log(
      //   "Category Added : ",
      //   newCategory.dataValues.category_id,
      //   " ",
      //   newCategory.dataValues.name
      // );
    }

    return {
      category_id: newCategory.dataValues.category_id,
      name: newCategory.dataValues.name,
      icon: newCategory.dataValues.icon,
    };
  },

  createUser: async function (args, req) {
    const name = args.userInput.name;
    const email = args.userInput.email;
    const password = args.userInput.password;

    let newUser;

    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser === null) {
      newUser = await User.create({
        name: name,
        email: email,
        Password: password,
      });
    } else {
      throw new Error(errorName.BADREQUEST);
    }

    return {
      user_id: newUser.dataValues.user_id,
      name: newUser.dataValues.name,
      email: newUser.dataValues.email,
      password: newUser.dataValues.Password,
    };
  },

  categories: async function (args, req) {
    const allCategories = await Category.findAll();

    // console.log(allCategories);

    const categories_array = [];

    for (let i = 0; i < allCategories.length; i++) {
      const tempObj = {
        category_id: allCategories[i].dataValues.category_id,
        name: allCategories[i].dataValues.name,
        icon: allCategories[i].dataValues.icon,
      };

      categories_array.push(tempObj);

      // console.log(allCategories[i].dataValues);
    }

    // const categories = { category_id: 1, name: "Hello", icon: "na" };

    console.log(categories_array);

    return categories_array;
  },
  createListing: async function (args, req) {
    const title = args.listingInput.title;
    const price = parseFloat(args.listingInput.price);
    const description = args.listingInput.description;
    const user_id = parseInt(args.listingInput.user_id);
    const category_id = parseInt(args.listingInput.category_id);

    const savedProduct = await Product.create({
      title: title,
      price: price,
      description: description,
      userUserId: user_id,
      categoryCategoryId: category_id,
    });

    const category = await Category.findByPk(category_id);

    const user = await User.findByPk(user_id);

    if (savedProduct) {
      return {
        product_id: savedProduct.dataValues.product_id,
        title: savedProduct.dataValues.title,
        price: savedProduct.dataValues.price,
        // image: savedProduct.dataValues.image,
        description: savedProduct.dataValues.description,
        category: category.dataValues.name,
        user: {
          user_id: user.dataValues.user_id,
          name: user.dataValues.name,
          email: user.dataValues.email,
          password: user.dataValues.Password,
        },
      };
    }
  },

  listings: async function (args, req) {
    const allProduct = await Product.findAll();

    const mainArray = [];

    const imgSrc = "http://192.168.1.6:5000/";

    for (let i = 0; i < allProduct.length; i++) {
      // console.log(allProduct[i].dataValues);

      const user = await User.findByPk(allProduct[i].dataValues.userUserId);

      // console.log(user.dataValues);

      const category = await Category.findByPk(
        allProduct[i].dataValues.categoryCategoryId
      );
      // console.log("Cat: ", category.dataValues);

      const image = await Images.findOne({
        where: { productProductId: allProduct[i].dataValues.product_id },
      });

      // console.log("Image: ", image.dataValues);

      const imagePieces = image.dataValues.image_src.split("\\");

      const tempObj = {
        listing: {
          product_id: allProduct[i].dataValues.product_id,
          title: allProduct[i].dataValues.title,
          price: allProduct[i].dataValues.price,
          description: allProduct[i].dataValues.description,
          category: category.dataValues.name,
          user: {
            user_id: user.dataValues.user_id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            password: user.dataValues.Password,
          },
        },
        image: imgSrc + imagePieces[0] + "/" + imagePieces[1],
      };

      mainArray.push(tempObj);
    }

    // console.log("All Product: ", allProduct);

    console.log("Arr: ", mainArray);

    return mainArray;
  },

  loginUser: async function (args, req) {
    const email = args.loginInput.email;
    const password = args.loginInput.password;

    const user = await User.findOne({
      where: { email: email, Password: password },
    });

    if (user === null) {
      return {
        token: "",
        error: "Email or Password is not correct!",
      };
    } else {
      const token = CreateJWTToken({
        UserId: user.dataValues.user_id,
        Name: user.dataValues.name,
        Email: user.dataValues.email,
      });
      return {
        token: token,
        error: "",
      };
    }
  },

  tempMutation: async function (args, req) {
    const one = args.noData.one;

    if (AuthUser(req) === false) {
      throw new Error(errorName.UNAUTHORIZED);
    }

    // const token = req.header("auth-token");
    // console.log("Token: ", token);

    return {
      yes: one,
    };
  },
};
