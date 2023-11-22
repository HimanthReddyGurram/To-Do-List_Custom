//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/mongoToDoListDB")

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
      })
  
const item = new mongoose.model("item", listSchema)

const L_1 = new item({
    name: "Buy apples"
});

const L_2 = new item({
    name: "Do homework"
});

const L_3 = new item({
    name: "Do 10 pushups"
});

const def_items = [L_1, L_2, L_3];

const lSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  items:[listSchema]
})
      
const List =mongoose.model("List",lSchema)

const user_1 = new List({
  name: "Default list",
  items: def_items
})

const user_2 = new List({
  name: "Himanth",
  items: def_items
})

const total_users=[user_1,user_2];

app.get("/", function (req, res) {

  async function k(){
   
    const reys = await item.find({})
    const tot_users=await List.find({})

    if (reys.length === 0) {
      item.insertMany(def_items).then(result => {
        console.log(result)
      });

      List.insertMany(total_users).then(result => {
        console.log(result)
      });

      res.redirect("/");
    }else{
      res.render("list", { listTitle: user_1.name, newListItems: reys ,tot:tot_users});
    }

  }k()

});

app.get("/:customListName", function (req, res) {

  const customListName = _.capitalize(req.params.customListName);
  
  async function f() {

    const tot_users=await List.find({})
    const a = await List.find({ name: customListName })

    if (a=="") {
      const list = new List({
        name: customListName,
        items: def_items
      })

      list.save();
      res.redirect("/"+customListName)
    } else {
      res.render("list",{ listTitle: a[0].name, newListItems: a[0].items,tot:tot_users })
    }

  }f()

  });


app.post("/a",function(req,res){

  var new_user=req.body.name;

  if(new_user!="" || new_user!="null" || new_user!='undefined'){
    res.redirect("/"+new_user);
  }else{
    res.redirect("/")
  }

})

app.post("/", function(req, res){

  const itemN = req.body.newItem;
  const su = req.body.list;
  const ite = new item({
    name: itemN
  });

  if (su===user_1.name) {
    ite.save();
    res.redirect("/");
  } else {
    async function a() {
      const a = await List.findOne({ name: su })
      a.items.push(ite);
      a.save();
    }a()
    res.redirect("/"+su)
  }

});

app.post("/delete", function (req, res) {

  const checkedItem = req.body.delvar;
  const lisnam = req.body.listName;

  if (lisnam === "Today") {
    item.findByIdAndDelete(checkedItem).then(result => {
      console.log(result)
    });
    res.redirect("/");
  } else {
    async function b() {
      const anal=await List.find({name:lisnam})
    }b()
    List.findOneAndUpdate({name:lisnam},{$pull:{items:{_id:checkedItem}}}).then(resu => {
      console.log(resu)
    })
    res.redirect("/"+lisnam);
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about/a", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

