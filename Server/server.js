const express = require('express')
const app = express()
var conn = require('./api/db')
var session = require('express-session')
const bodyParser = require('body-parser')
var { check, validationResult } = require('express-validator')
require('dotenv').config({ path: 'relative/path/to/your/.env' })
const port = process.env.PORT || 3000
const bcrypt = require('bcrypt');
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    name: 'SESSION_ID',
    secret: 'my_secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 30 * 8640000,
    }

}))

app.use(function(req, res, next) {
    res.locals.session = req.session;

    // Lấy thông báo của trang trước đó (nếu có)
    var error = req.session.error;
    var success = req.session.success;

    delete req.session.error;
    delete req.session.success;

    res.locals.errorMsg = '';
    res.locals.successMsg = '';



    next();
});

let routes = require('./api/routes') //importing route
routes(app)
let benhnhan = require('./api/benhnhan')
const { compare } = require('bcrypt')
benhnhan(app)

app.get('/', function(req, res) {
    res.render('index', { title: 'Trang chủ' })

})

// bệnh nhân
app.get('/benhnhan/them', function(req, res) {
    res.render('benhnhan_them', { title: 'Thêm bệnh nhân' })
})
app.post('/benhnhan/them', function(req, res) {
    var benhnhan = {
        hoten: req.body.hoten,
        cmnd: req.body.cmnd,
        gioitinh: req.body.gioitinh,
        ngaysinh: req.body.ngaysinh,
        sophong: req.body.sophong,
        ghichu: req.body.ghichu,
    };
    var sql = 'insert into benhnhan set?';
    conn.query(sql, benhnhan, function(error, results) {
        if (error)
            res.send(error)
        else
            res.send('Đã thêm thành công')
    })
})
app.get('/benhnhan', function(req, res) {
    var sql = "select * from benhnhan";
    conn.query(sql, function(error, results) {
        if (error)
            res.send(error)
        else
            res.render('benhnhan', {
                title: 'Danh sách bệnh nhân',
                benhnhan: results
            })
    })
})
app.get('/benhnhan/sua/:id', function(req, res) {
    var id = req.params.id;
    var sql = 'select * from benhnhan where id = ?';
    conn.query(sql, [id], function(error, results) {
        if (error)
            res.send(error);
        else
            res.render('benhnhan_sua', {
                title: 'Sửa bệnh nhân',
                id: results[0].id,
                hoten: results[0].hoten,
                cmnd: results[0].cmnd,
                gioitinh: results[0].gioitinh,
                ngaysinh: results[0].ngaysinh,
                sophong: results[0].sophong,
                ghichu: results[0].ghichu,
            })
    })
})
app.post('/benhnhan/sua/:id', function(req, res) {
    var benhnhan = {
        hoten: req.body.hoten,
        cmnd: req.body.cmnd,
        gioitinh: req.body.gioitinh,
        ngaysinh: req.body.ngaysinh,
        sophong: req.body.sophong,
        ghichu: req.body.ghichu,
    };
    var id = req.params.id;
    var sql = 'update benhnhan set ? where id =?';
    conn.query(sql, [benhnhan, id], function(error, results) {
        if (error)
            res.send(error)
        else
            res.redirect('/benhnhan')
    })
})

app.get('/benhnhan/xoa/:id', function(req, res) {
        var id = req.params.id;
        var sql = 'delete from benhnhan where id =?';
        conn.query(sql, [id], function(error, results) {
            if (error)
                res.send(error)
            else
                res.redirect('/benhnhan')
        })
    })
    // tài khoản
app.get('/taikhoan', function(req, res) {
    var sql = "select * from taikhoan";
    conn.query(sql, function(error, results) {
        if (error)
            res.send(error)
        else
            res.render('taikhoan', {
                title: 'Danh sách tài khoản',
                taikhoan: results
            })
    })
})

app.get('/taikhoan/them', function(req, res) {
    res.render('taikhoan_them', { title: 'Thêm tài khoản' })
})
app.post('/taikhoan/them', function(req, res) {
    var taikhoan = {
        tendangnhap: req.body.tendangnhap,
        matkhau: req.body.matkhau,
        quyen: req.body.quyen
    };
    var sql = 'insert into taikhoan set?';
    conn.query(sql, taikhoan, function(error, results) {
        if (error)
            res.send(error)
        else
            res.redirect('/taikhoan')
    })
})
app.get('/taikhoan/sua/:id', function(req, res) {
    var id = req.params.id;
    var sql = 'select * from taikhoan where id = ?';
    conn.query(sql, [id], function(error, results) {
        if (error)
            res.send(error);
        else
            res.render('taikhoan_sua', {
                title: 'Sửa tài khoản',
                id: results[0].id,
                tendangnhap: results[0].tendangnhap,
                matkhau: results[0].matkhau,
                quyen: results[0].quyen
            })
    })
})
app.post('/taikhoan/sua/:id', function(req, res) {
    var taikhoan = {
        tendangnhap: req.body.tendangnhap,
        matkhau: req.body.matkhau,
        quyen: req.body.quyen,
    };
    var id = req.params.id;
    var sql = 'update taikhoan set ? where id =?';
    conn.query(sql, [taikhoan, id], function(error, results) {
        if (error)
            res.send(error)
        else
            res.redirect('/taikhoan')
    })
})


app.get('/taikhoan/xoa/:id', function(req, res) {
    var id = req.params.id;
    var sql = 'delete from taikhoan where id =?';
    conn.query(sql, [id], function(error, results) {
        if (error)
            res.send(error)
        else
            res.redirect('/taikhoan')
    })
})

//Get:  Đăng nhập
app.get('/dangnhap', function(req, res) {
    res.render('dangnhap', { title: 'Đăng nhập' });
});
//Post: đăng nhập
app.post('/dangnhap', function(req, res) {
    if (req.session.MaNguoiDung) {
        res.send('Người dùng đã đăng nhập rồi')
    } else {
        var tdn = req.body.tendangnhap
        var mk = req.body.matkhau
        var sql = "select * from taikhoan where tendangnhap = ?";
        conn.query(sql, [tdn], function(error, results) {
            if (error)
                res.send(error)
            else if (results.length > 0) {
                //res.send(results[0].tendangnhap)
                // if (mk == results[0].matkhau) {
                //     if (results[0].quyen == 1)
                //         res.render('admin', { title: 'Admin' });
                //     else if (results[0].quyen == 2)
                //         res.render('bacsi', { title: 'Bác sĩ' });
                // } else
                //     res.send('thất bại')
                if (mk == results[0].matkhau) {
                    req.session.MaNguoiDung = results[0].id;
                    req.session.quyen = results[0].quyen;

                    res.redirect('/');
                } else {
                    res.send('Mật khẩu không đúng');
                }

            } else {
                res.send('Tài khoản không tồn tại');
            }


        })
    }
});
// GET: Đăng xuất
app.get('/dangxuat', function(req, res) {
    if (req.session.MaNguoiDung) {
        delete req.session.MaNguoiDung;
        delete req.session.quyen;

        res.redirect('/');
    } else {
        req.session.error = 'Người dùng chưa đăng nhập.';
        res.redirect('/error');
    }
});
//admin
app.get('/admin', function(req, res) {
    res.render('admin', { title: 'Admin' });
});
app.get('/bacsi', function(req, res) {
    res.render('bacsi', { title: 'Bác sĩ' });
});
app.get('/yta', function(req, res) {
    res.render('yta', { title: 'Y tá' });
});
app.get('/heart_rate', function(req, res) {
    var sql = " select * from benhnhan bn, data d where bn.id = d.id_benhnhan  and bn.id = (select max(id) from benhnhan) and d.id=(select max(id) from data);";
    conn.query(sql, function(error, results) {
        if (error)
            res.send(error)
        else
            res.render('heart_rate', {
                title: 'Đo nhịp tim',
                benhnhan: results
            })
    })
});
//not found
app.use(function(req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
})

app.listen(port)

console.log('RESTful API server started on: ' + port)