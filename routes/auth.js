const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const yelp = require('../public/javascripts/yelp')
const Bussineses = require('../models/bussineses.model')
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


  let name; let image_url;let latitude; let longitude; let  phone; let rating; let price
  
  yelp.getHotels(city, business)
    .then(response => {
      res.json(response.data)

      Search.findOne({zone: city, place: business})
        .then(encontrados => {
          
              if (!encontrados){
                Search.create({ user_id: userId, zone: city, place: business})
          
                // .populate('user_id')
                .then(search => {
                  User.findByIdAndUpdate(userId, { $push: { search_id: search._id } })
                    .then(user => {
                    
                      response.data.businesses.forEach(x => {
                        name = x.name
                        image_url = x.image_url
                        latitude = x.coordinates.latitude
                        longitude = x.coordinates.longitude
                        phone = x.phone
                        rating = x.rating
                        price = x.price
                       
                        Bussineses.create({ user_id: user._id, search_id: search._id, name, 
                          image_url, latitude, longitude, phone, rating, price})
                          // .populate('user_id')
                          .then(bussineses => {
                            // console.log(bussineses)
                            
                            User.findByIdAndUpdate(user._id, { $push: { bussineses_id: bussineses._id } })
                            // .populate('user_id')
                            .then(user => console.log(user))
                            // Search.findByIdAndUpdate(searchId, { $push: { bussineses_id: bussineses_id } })
                            //   .then(user => console.log(user))
                  
                          })
                          // .catch(err => console.log('Hubo un error:', err))
          
          
                    })
          
                })
                .catch(err => console.log('Hubo un error:', err))
          
          
                    
                })
        
              }

        }  )
         
    
    

    }).catch(err => console.log(err))


})

router.get('/lookups', (req, res) => {

  if (req.isAuthenticated()) {
    User.findById(req.user.id).populate('search_id').populate('bussineses_id')
      .then(user => {

        res.render('auth/lookups', { user })
      })
     
  }
  else {
    res.redirect('login')
  }
})

router.get('/lookups/:id', (req, res, next) => {
  const searchId = req.params.id
  Search.findById(searchId)
  .populate('bussineses_id')
  .then(searches => res.render('auth/search-details'), {search: searches})
  .catch(err => console.log('err', err))
})
//*
// outer.post('/lookups', (req, res) => {

//   if (req.isAuthenticated()) {
//     User.findById(req.user.id).populate('search_id')
//       .then(user => {

//         res.render('auth/lookups', { user })
//       })


//   }
//   else {
//     res.redirect('login')
//   }
// })


//

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