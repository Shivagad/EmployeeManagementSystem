import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, salary,image, category_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };



// import express from "express";
// import con from "../utils/db.js";
// import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt';
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// // JWT Authentication Middleware
// router.use((req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) return res.status(403).send('Access denied.');
    
//     jwt.verify(token, "jwt_secret_key", (err, decoded) => {
//         if (err) return res.status(403).send('Invalid token.');
//         req.adminId = decoded.id; // Save the admin id from the token
//         next();
//     });
// });

// // Admin Login
// router.post("/adminlogin", (req, res) => {
//     const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
//     con.query(sql, [req.body.email, req.body.password], (err, result) => {
//         if (err) return res.json({ loginStatus: false, Error: "Query error" });
//         if (result.length > 0) {
//             const email = result[0].email;
//             const token = jwt.sign(
//                 { role: "admin", email: email, id: result[0].id },
//                 "jwt_secret_key",
//                 { expiresIn: "1d" }
//             );
//             res.cookie('token', token);
//             return res.json({ loginStatus: true });
//         } else {
//             return res.json({ loginStatus: false, Error: "Wrong email or password" });
//         }
//     });
// });

// // Get Admin Profile
// router.get('/admin/profile', (req, res) => {
//     const sql = "SELECT * FROM admin WHERE id = ?";
//     con.query(sql, [req.adminId], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         if (result.length > 0) {
//             return res.json({ Status: true, Result: result[0] }); // Return the admin's details
//         } else {
//             return res.json({ Status: false, Error: "Admin not found" });
//         }
//     });
// });

// // Edit Admin Profile
// router.put('/admin/profile', (req, res) => {
//     const sql = `UPDATE admin SET name = ?, email = ?, password = ? WHERE id = ?`;
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) return res.json({ Status: false, Error: "Hashing error" });
        
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash, // Use hashed password
//             req.adminId
//         ];

//         con.query(sql, values, (err, result) => {
//             if (err) return res.json({ Status: false, Error: "Query Error" + err });
//             return res.json({ Status: true, Result: result });
//         });
//     });
// });

// // Logout
// router.get('/admin/logout', (req, res) => {
//     res.clearCookie('token');
//     return res.json({ Status: true });
// });

// // Category Routes
// router.get('/category', (req, res) => {
//     const sql = "SELECT * FROM category";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         return res.json({ Status: true, Result: result });
//     });
// });

// router.post('/add_category', (req, res) => {
//     const sql = "INSERT INTO category (`name`) VALUES (?)";
//     con.query(sql, [req.body.category], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         return res.json({ Status: true });
//     });
// });

// // Image Upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'Public/Images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });
// // End Image Upload 

// // Employee Routes
// router.post('/add_employee', upload.single('image'), (req, res) => {
//     const sql = `INSERT INTO employee 
//     (name, email, password, address, salary, image, category_id) 
//     VALUES (?)`;
//     bcrypt.hash(req.body.password, 10, (err, hash) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         const values = [
//             req.body.name,
//             req.body.email,
//             hash,
//             req.body.address,
//             req.body.salary, 
//             req.file.filename,
//             req.body.category_id
//         ];
//         con.query(sql, [values], (err, result) => {
//             if (err) return res.json({ Status: false, Error: err });
//             return res.json({ Status: true });
//         });
//     });
// });

// router.get('/employee', (req, res) => {
//     const sql = "SELECT * FROM employee";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         return res.json({ Status: true, Result: result });
//     });
// });

// router.get('/employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee WHERE id = ?";
//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" });
//         return res.json({ Status: true, Result: result });
//     });
// });

// router.put('/edit_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = `UPDATE employee 
//         SET name = ?, email = ?, salary = ?, address = ?, category_id = ? 
//         WHERE id = ?`;
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.salary,
//         req.body.address,
//         req.body.category_id
//     ];
//     con.query(sql, [...values, id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err });
//         return res.json({ Status: true, Result: result });
//     });
// });

// router.delete('/delete_employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "DELETE FROM employee WHERE id = ?";
//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err });
//         return res.json({ Status: true, Result: result });
//     });
// });

// // Admin and Employee Count Routes
// router.get('/admin_count', (req, res) => {
//     const sql = "SELECT COUNT(id) AS admin FROM admin";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err });
//         return res.json({ Status: true, Result: result });
//     });
// });

// router.get('/employee_count', (req, res) => {
//     const sql = "SELECT COUNT(id) AS employee FROM employee";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err });
//         return res.json({ Status: true, Result: result });
//     });
// });

// // Salary Count Route
// router.get('/salary_count', (req, res) => {
//     const sql = "SELECT SUM(salary) AS salaryOFEmp FROM employee";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err });
//         return res.json({ Status: true, Result: result });
//     });
// });

// // Admin Records Route
// router.get('/admin_records', (req, res) => {
//     const sql = "SELECT * FROM admin";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" + err });
//         return res.json({ Status: true, Result: result });
//     });
// });


// // Admin Login
// router.post("/admin_login", (req, res) => {
//     const sql = "SELECT * FROM admin WHERE email = ?";
//     con.query(sql, [req.body.email], (err, result) => {
//         if (err) return res.json({ loginStatus: false, Error: "Query error" });
//         if (result.length > 0) {
//             bcrypt.compare(req.body.password, result[0].password, (err, response) => {
//                 if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
//                 if (response) {
//                     const email = result[0].email;
//                     const token = jwt.sign(
//                         { role: "admin", email: email, id: result[0].id },
//                         "jwt_secret_key",
//                         { expiresIn: "1d" }
//                     );
//                     res.cookie('token', token);
//                     return res.json({ loginStatus: true, id: result[0].id });
//                 } else {
//                     return res.json({ loginStatus: false, Error: "Wrong email or password" });
//                 }
//             });
//         } else {
//             return res.json({ loginStatus: false, Error: "Wrong email or password" });
//         }
//     });
// });

// // Get Admin Detail by ID
// router.get('/admin/detail/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM admin WHERE id = ?";
//     con.query(sql, [id], (err, result) => {
//         if (err) return res.json({ Status: false });
//         if (result.length > 0) {
//             return res.json({ Status: true, Result: result[0] });
//         } else {
//             return res.json({ Status: false, Error: "Admin not found" });
//         }
//     });
// });

// // Admin Logout
// router.get('/admin/logout', (req, res) => {
//     res.clearCookie('token');
//     return res.json({ Status: true });
// });


// export { router as adminRouter };
