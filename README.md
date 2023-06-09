# Bookerfly 📚

BookerFly is a side project with a porpose to manage libraries inside of schools, change the pen and paper to a complete web application that makes all these work more simple to manage

# Features

<ul>
<li>Complete dashboard to manage all the system</li>
<li>Register, update and delete books and students</li>
<li>Borrow books to the students</li>
<li>Find books and list ranking of students with more books read</li>

<li>Register and auth admin</li>

</ul>

## Getting Started

<ul>
<li>

Clone the repo:

```bash
git clone https://github.com/ValbertMartins/bookerfly.git
```

</li>

<li>
Then, create a <strong>.env</strong> file in your root folder and add the following enviroments
</li>

```bash
DATABASE_URL="mysql://root:root@localhost:3306/bookerfly"
CLOUD_NAME="" #cloudinary image provider name, sign in cloudinary https://cloudinary.com/ to get your credentials
API_KEY="" #cloudinary api key
API_SECRET="" #cloudinary api secret
JWT_SECRET="" #Generate a strong jwt secret
```

Then, run the following commands:

```bash
npm run dev
```

<ul>
<li>⚠️
The first time that you clone this repo, its necessary run the above commands twice to generate db and create the volumes, because this maybe migrations doesnt running in the first time.
</li>
</ul>

&nbsp;

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
