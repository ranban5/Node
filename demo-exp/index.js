const Joi = require("joi");
const express = require("express");
const { response } = require("express");
const { object } = require("joi");
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
app.get("/", (req, res) => {
  res.send("Hello Express World learing");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The requested ID is not found in the courses");
  res.send(course);
});

app.post("/api/courses/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The requested ID is not found in the courses");
  }
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  course.name = req.body.name;
  res.send(course);
});
function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The requested ID is not found in the courses");
  }
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listingig in port ${port} new`));
