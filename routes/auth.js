const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const yelp = require('../public/javascripts/yelp')

const Search = require('../models/searches.model')
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;



router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/profile",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" });
      })
  })
})


router.get('/profile', (req, res) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id).populate('search_id')
      .then(user => {

        res.render('auth/profile', { user })
      })


  }
  else {
    res.redirect('login')
  }
})

router.get('/api/search', (req, res) => {

  const city = req.query.city

  const business = req.query.business

  const userId = req.user._id

  yelp.getHotels(city, business)
    .then(response => {
      // console.log(business)
      res.json(response.data)


      Search.create({ user_id: userId, zone: city, place: business })
        // .populate('user_id')
        .then(search => {
          User.findByIdAndUpdate(userId, { $push: { search_id: search._id } })
            .then(user => console.log(user))

        })
        .catch(err => console.log('Hubo un error:', err))


    }).catch(err => console.log(err))


})

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
})



module.exports = router;


// router.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render('auth/profile', { user: req.user });
//   }
//   else {
//     res.redirect('login')
//   }
// })


// router.get('/profile', (req, res) => {
//   if (req.isAuthenticated()) {
//     yelp.getHotels()
//       .then(respo => {
//         console.log(respo)
//         res.render('auth/profile', { user: req.user, respo })

//       })
//       .catch(err => console.log('error', err))
//   }

//   else {
//     res.redirect('login')
//   }

// })