var mysql = require('mysql2');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

// 跟chatroom有關開始:
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = process.env.PORT || 8080;
// 跟chatroom有關結束

// 連線後端資料庫開始
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0430",
    database : 'homecarev1'
  });
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// 連線後端資料庫結束

// list tables 檢查
con.query('SHOW TABLES', function (error, results, fields) {
    if (error) throw error
    console.log('There are tables: ', results)
  })


// middleware開始 
//將request進來的 data 轉成 json()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '..', '..' ,'client', 'src')));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
// middleware結束

// chatroom處理開始
let users = [];
wss.on('connection', (socket) => {
  console.log('有客戶端連線');

  let isNewPerson = true;
  // let username = null;
  // let username = "Wilson";

  // 每當客戶端發送訊息到伺服器時，這個回調函式就會被觸發。
  socket.on('message', (message) => {
    // 從client端的chatroom會傳訊息到這裡，data就是傳來的訊息
    const data = JSON.parse(message);
    console.log("收到的data name:"+data.username);
    console.log("收到的data message:"+data.message);
    // console.log('收到的datatype:'+ data.type);
    console.log("xxxx");
    wss.clients.forEach((client) => {
      console.log("傳去前端的data"+data);
      console.log("傳去前端的data name:"+data.username);
      console.log("傳去前端的data message:"+data.message);
      client.send(JSON.stringify({data}));
    });

    
  });
  
});
// chatroom處理結束

// initialpage部分開始
app.post('/checkLogin', (req, res) => {
  // post=>req.body; get=>req.query
  const { email, password } = req.body; // 從前端的 axios 請求中取得 email 和 password
  console.log("email:"+email)
  console.log("password:"+password)
  // 在這裡執行檢查 email 是否存在及驗證密碼的邏輯
  con.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error('資料庫查詢錯誤', error);
      res.json({ success: false, message: '資料庫查詢錯誤' });
      return;
    }

    if (results.length === 0) {
      // 如果找不到對應的 email，回傳失敗
      res.json({ success: false, message: 'Email 不存在' });
    } 
    else {
      // 找到對應的 email，進一步驗證密碼是否正確
      const user = results[0];
      if (user.password === password) {
        // 密碼正確，回傳成功
        res.json({ success: true, message: '登入成功',  user_id: user.user_id });
      } 
      else {
        // 密碼錯誤，回傳失敗
        res.json({ success: false, message: '密碼錯誤' });
      }
    }
  });
});
// initialpage部分結束

// homepage部分開始
app.get('/user-backend-name/:email', (req, res) => {
  const targetUseremail = req.params.email; // 從路徑參數中取得傳遞的名稱
  con.query('SELECT username FROM users WHERE email = ?',[targetUseremail], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("name req有傳來!")
    res.json(results);
  });
});

app.get('/user-gender/:email', (req, res) => {
  const targetUseremail = req.params.email; // 從路徑參數中取得傳遞的名稱
  console.log("targetUseremail2:"+targetUseremail)
  con.query('SELECT gender FROM users WHERE email = ?',[targetUseremail], function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      // const gender = results[0].gender; // 取得第一個結果的性別欄位值
      console.log("gender req有傳來!");
      // res.json({ gender });
      res.json(results);
    } else {
      res.json({ error: "User not found" });
    }
  });
});
// homepage部分結束

// profile部分開始
app.get('/checkUserRole/:name', (req, res) => {
  console.log('Current session data:', req.session);
  const targetUsername = req.params.name; // 從路徑參數中取得傳遞的名稱
  console.log("targetname:"+targetUsername)
  con.query('SELECT role FROM users WHERE username = ?', [targetUsername], function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      // const role = results[0].role;
      console.log("role req有傳來!");
      // res.json({ role });
      res.json(results);
    } else {
      res.json({ error: "User not found" });
    }
  });
});
// profile部分結束

// homepagemed部分開始
app.get('/user-specialization/:name', (req, res) => {
  const targetUsername = req.params.name;
  console.log("targetname:"+targetUsername)
  con.query('SELECT specialization FROM medicalprofessional WHERE full_name = ?',[targetUsername], function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      // const gender = results[0].gender; // 取得第一個結果的性別欄位值
      console.log("specialization req有傳來!");
      // res.json({ gender });
      res.json(results);
    } else {
      res.json({ error: "User not found" });
    }
  });
});
// homepagemed部分結束

// verification部分開始
app.post('/addUser', (req, res) => {
  const { gender, name, email, password, role } = req.body;

  // 建立 SQL 查詢語句
  const sql = 'INSERT INTO users (gender, username, email, password, role) VALUES (?, ?, ?, ?, ?)';
  
  // 執行 SQL 查詢
  con.query(sql, [gender, name, email, password, role], (error, result) => {
    if (error) {
      console.error('新增使用者時發生錯誤', error);
      res.json({ success: false });
    } else {
      console.log('新增使用者成功');
      res.json({ success: true });
    }
  });
});
// verification部分結束

// search部分開始
app.get('/medical-professionals', (req, res) => {
  con.query('SELECT * FROM medicalprofessional', function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      console.log("search的醫療人員列表 req有傳來!");
      console.log(results)
      res.json(results);
    } else {
      res.json({ error: "No medical professionals found" });
    }
  });
});

// search部分結束

// meddetail部分開始
app.get('/professional-backend-name/:professional_id', (req, res) => {
  const targetMedid = req.params.professional_id; // 從路徑參數中取得傳遞的名稱
  con.query('SELECT full_name FROM medicalprofessional WHERE professional_id = ?',[targetMedid], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("professional_name req有傳來!")
    res.json(results);
  });
});

app.get('/professional-backend-spec/:professional_id', (req, res) => {
  const targetMedid = req.params.professional_id;
  con.query('SELECT full_name, specialization, biography,experience_year, rating, patients_number FROM medicalprofessional WHERE professional_id = ?', [targetMedid], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("Request for professional data received!");
    res.json(results);
  });
});

app.get('/get-professional-servicename/:professional_id', (req, res) => {
  const targetProfessionalId = req.params.professional_id;
  con.query('SELECT service_name FROM services WHERE professional_id = ?', [targetProfessionalId], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("Request for services data received!");
    res.json(results);
  });
});

// meddetail部分結束

// appointcalendar部分開始


app.get('/get-service-hours/:professional_id/:service_name', (req, res) => {
  const targetProfessionalId = req.params.professional_id;
  const targetServiceName = req.params.service_name;
  const targetDate = req.query.date; // 從 query 字串中取得日期

  // 使用 targetDate 查詢對應日期的服務時段
  con.query('SELECT start_time FROM servicehours WHERE professional_id = ? AND service_name = ? AND day = ?', [targetProfessionalId, targetServiceName, targetDate], function (error, results, fields) {
      if (error) {
          throw error;
      }
      // 對取得的結果按照時間排序
      const sortedResults = results.sort((a, b) => a.start_time.localeCompare(b.start_time));
      console.log("Request for service hours data received!");
      res.json(sortedResults);
      console.log("sortedResults:"+sortedResults)
  });
});



app.get('/get-service-price/:professional_id/:service_name', (req, res) => {
  const targetProfessionalId = req.params.professional_id;
  const targetServiceName = req.params.service_name;
  

  // 使用 targetDate 查詢對應日期的服務時段
  con.query('SELECT base_price FROM services WHERE professional_id = ? AND service_name = ? ', [targetProfessionalId, targetServiceName], function (error, results, fields) {
      if (error) {
          throw error;
      }
      
      console.log("Request for service price received!");
      res.json(results);
      console.log("results:"+results)
  });
});


// payment頁面開始
app.post('/create-appointment', (req, res) => {
  const { user_id, professional_id, service_name, appointment_date, appointment_start_time, status } = req.body;

  con.query(
    'INSERT INTO appointments (user_id, professional_id, service_name, appointment_date, appointment_start_time, status) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, professional_id, service_name, appointment_date, appointment_start_time, status],
    (error, results) => {
      if (error) {
        console.error('新增預約失敗', error);
        res.json({ success: false, message: '新增預約失敗' });
      } else {
        console.log('新增預約成功');
        res.json({ success: true, message: '新增預約成功' });
      }
    }
  );
});













// 監聽於 8080 端口(記得app.listen要改成server.listen)
server.listen(port, function () {
    console.log('Node app is running on port'+ port);
});
  