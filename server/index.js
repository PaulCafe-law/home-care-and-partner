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
    //遍历了 WebSocket 服务器上的所有客户端连接
    wss.clients.forEach((client) => {
      console.log("傳去前端的data"+data);
      console.log("傳去前端的data name:"+data.username);
      console.log("傳去前端的data message:"+data.message);
      client.send(JSON.stringify({data}));
    });

    
  });
  
});

app.post('/add-message', async (req, res) => {
  try {
    // 从请求的 body 中获取消息数据
    const { sender_id, receiver_id, content, timestamp } = req.body;

    // 插入数据到 messages 表
    const insertResult = await new Promise((resolve, reject) => {
      con.query(
        'INSERT INTO messages (sender_id, receiver_id, content, timestamp) VALUES (?, ?, ?, ?)',
        [sender_id, receiver_id, content, timestamp],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });

    // 插入成功，返回成功响应
    res.status(200).json({ message: 'Message added successfully' });
  } catch (error) {
    console.error('数据库操作错误', error);
    res.status(500).json({ error: '数据库操作错误' });
  }
});

app.get('/get-messages/:sender_id/:receiver_id', async (req, res) => {
  const targetId1 = req.params.sender_id;
  const targetId2 = req.params.receiver_id;
  try {
    // 在此查询数据库，获取 messages 表中的内容，按照 sender_id 和 receiver_id 进行筛选
    const messages = await new Promise((resolve, reject) => {
      con.query('SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)',
        [targetId1, targetId2, targetId2, targetId1], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
        });
    });

    // 返回获取到的消息数据
    res.json(messages);
  } catch (error) {
    console.error('数据库查询错误', error);
    res.status(500).json({ error: '数据库查询错误' });
  }
});


// chatroom處理結束

//chatroommed處理開始
app.get('/get-user-backend-id/:client_id', (req, res) => {
  const targetClientId = req.params.client_id; // 從路徑參數中取得傳遞的名稱
  con.query('SELECT username FROM users WHERE user_id = ?',[targetClientId], function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log("clientname req有傳來!")
    res.json(results);
  });
});

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


app.get('/get-nearest-appointment/:user_id/:formattedDate/:present_time', async (req, res) => {
  const user_id = req.params.user_id;
  const formattedDate = req.params.formattedDate;
  const presentTime = req.params.present_time;

  try {
    const result = await new Promise((resolve, reject) => {
      con.query('SELECT professional_id, service_name, appointment_start_time FROM appointments WHERE user_id = ? AND appointment_date = ? AND appointment_start_time > ? ORDER BY appointment_start_time ASC LIMIT 1', 
        [user_id, formattedDate, presentTime], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results[0]); // 只返回一行
        });
    });

    if (!result) {
      // 如果没有匹配的预约，可以返回空数据或适当的错误消息
      res.json({ message: '没有符合条件的预约' });
      return;
    }

    const { professional_id, service_name, appointment_start_time } = result;

    const professionalInfo = await new Promise((resolve, reject) => {
      con.query('SELECT full_name, specialization FROM medicalprofessional WHERE professional_id = ?', 
        [professional_id], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results[0]);
        });
    });

    const response = {
      professional_id,
      service_name,
      appointment_start_time,
      full_name: professionalInfo.full_name,
      specialization: professionalInfo.specialization
    };

    res.json(response);
  } catch (error) {
    console.error('数据库查询错误', error);
    res.status(500).json({ error: '数据库查询错误' });
  }
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

app.get('/get-users-professionalId/:user_id', (req, res) => {
  console.log('Current session data:', req.session);
  const targetUserId = req.params.user_id; // 從路徑參數中取得傳遞的名稱
  // console.log("targetname:"+targetUsername)
  con.query('SELECT professional_id FROM medicalprofessional WHERE user_id = ?', [targetUserId], function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      // const role = results[0].role;
      console.log("professionalid req有傳來!");
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

app.get('/user-professional-id/:email', (req, res) => {
  const targetEmail = req.params.email;
  console.log("targetEmail:"+targetEmail)
  con.query('SELECT professional_id FROM medicalprofessional WHERE email = ?',[targetEmail], function (error, results, fields) {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      // const gender = results[0].gender; // 取得第一個結果的性別欄位值
      console.log("professional_id req有傳來!");
      // res.json({ gender });
      res.json(results);
    } else {
      res.json({ error: "User not found" });
    }
  });
});

app.get('/get-nearest-appointment-med/:professional_id/:formattedDate/:present_time', async (req, res) => {
  const professional_id = req.params.professional_id;
  const formattedDate = req.params.formattedDate;
  const presentTime = req.params.present_time;

  try {
    const result = await new Promise((resolve, reject) => {
      con.query('SELECT user_id, service_name, appointment_start_time FROM appointments WHERE professional_id = ? AND appointment_date = ? AND appointment_start_time > ? ORDER BY appointment_start_time ASC LIMIT 1', 
        [professional_id, formattedDate, presentTime], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results[0]); // 只返回一行
        });
    });

    if (!result) {
      // 如果没有匹配的预约，可以返回空数据或适当的错误消息
      res.json({ message: '没有符合条件的预约' });
      return;
    }

    const { user_id, service_name, appointment_start_time } = result;
    console.log("xxxxxxxxxxxx")
    console.log("user_id:"+user_id)


    const clientInfo = await new Promise((resolve, reject) => {
      con.query('SELECT username, gender FROM users WHERE user_id = ?', 
        [user_id], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results[0]);
        });
    });

    const response = {
      username: clientInfo.username,
      service_name,
      appointment_start_time,
      gender: clientInfo.gender
    };

    res.json(response);
  } catch (error) {
    console.error('数据库查询错误', error);
    res.status(500).json({ error: '数据库查询错误' });
  }
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
  con.query('SELECT full_name, user_id, specialization, biography,experience_year, rating, patients_number FROM medicalprofessional WHERE professional_id = ?', [targetMedid], function (error, results, fields) {
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
      } 
      else {
        console.log('新增預約成功');
        res.json({ success: true, message: '新增預約成功' });
      }
    }
  );
});



// schedule頁面開始


app.get('/get-appointments/:user_id/:formattedDate', async (req, res) => {
  const user_id = req.params.user_id;
  const formattedDate = req.params.formattedDate;

  try {
    const results = await new Promise((resolve, reject) => {
      con.query('SELECT professional_id, service_name, appointment_start_time FROM appointments WHERE user_id = ? AND appointment_date = ?', 
        [user_id, formattedDate], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
          console.log("results:"+results)
        });
    });
    // 
    // await Promise.all 是一個用於等待多個 Promise 同時完成的 JavaScript 語法。
    // 當你有多個需要同時執行的非同步操作（例如多個 API 請求），並且需要等待它們都完成後進行後續操作時，可以使用 await Promise.all
    const appointmentData = await Promise.all(results.map(async appointment => {
      const { professional_id, service_name, appointment_start_time } = appointment;

      const professionalInfo = await new Promise((resolve, reject) => {
        con.query('SELECT full_name, specialization FROM medicalprofessional WHERE professional_id = ?', 
          [professional_id], (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results[0]); // 假設結果是一筆資料
          });
      });

      return {
        professional_id,
        service_name,
        appointment_start_time,
        full_name: professionalInfo.full_name,
        specialization: professionalInfo.specialization
      };
    }));
    // 將 appointmentData 依照 appointment_start_time 排序
    appointmentData.sort((a, b) => a.appointment_start_time.localeCompare(b.appointment_start_time));
    res.json(appointmentData);
  } catch (error) {
    console.error('資料庫查詢錯誤', error);
    res.status(500).json({ error: '資料庫查詢錯誤' });
  }
});


// appointment-med部分開始
app.get('/get-appointments-med/:professional_id/:formattedDate', async (req, res) => {
  const professional_id = req.params.professional_id;
  const formattedDate = req.params.formattedDate;
  const targetStatus = "等待回應";
  console.log("professional_id:"+professional_id)
  console.log("formattedDate:"+formattedDate)
  try {
    const results = await new Promise((resolve, reject) => {
      con.query('SELECT appointment_id, user_id, service_name, appointment_start_time FROM appointments WHERE status = ? AND professional_id = ? AND appointment_date = ? ', 
        [targetStatus, professional_id, formattedDate], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
          console.log("results:"+results)
        });
    });
    // 
    // await Promise.all 是一個用於等待多個 Promise 同時完成的 JavaScript 語法。
    // 當你有多個需要同時執行的非同步操作（例如多個 API 請求），並且需要等待它們都完成後進行後續操作時，可以使用 await Promise.all
    const appointmentData = await Promise.all(results.map(async appointment => {
      const {appointment_id, user_id, service_name, appointment_start_time } = appointment;

      const userInfo = await new Promise((resolve, reject) => {
        con.query('SELECT username, gender FROM users WHERE user_id = ?', 
          [user_id], (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results[0]); // 假設結果是一筆資料
          });
      });

      return {
        appointment_id,
        user_id,
        service_name,
        appointment_start_time,
        username: userInfo.username,
        gender: userInfo.gender
      };
    }));
    // 將 appointmentData 依照 appointment_start_time 排序
    appointmentData.sort((a, b) => a.appointment_start_time.localeCompare(b.appointment_start_time));
    res.json(appointmentData);
  } catch (error) {
    console.error('資料庫查詢錯誤', error);
    res.status(500).json({ error: '資料庫查詢錯誤' });
  }
});


app.post('/update-appointment-status', (req, res) => {
  const { appointment_id, new_status } = req.body;
  console.log("appointment_id:"+appointment_id)
  console.log("new_status:"+new_status)
  con.query('UPDATE appointments SET status = ? WHERE appointment_id = ?', [new_status, appointment_id], (error, results) => {
    if (error) {
      console.error('資料庫更新錯誤', error);
      res.status(500).json({ error: '資料庫更新錯誤' });
      return;
    }

    // 更新成功
    console.log("更新預約狀態成功")
    res.json({ success: true, message: '預約狀態更新成功' });
  });
});


// schedulemed部分開始
app.get('/get-schedule-appointments-med/:professional_id/:formattedDate', async (req, res) => {
  const professional_id = req.params.professional_id;
  const formattedDate = req.params.formattedDate;
  console.log("professional_id:"+professional_id)


  try {
    const results = await new Promise((resolve, reject) => {
      con.query('SELECT user_id, service_name, appointment_start_time FROM appointments WHERE professional_id = ? AND appointment_date = ? AND (status = "已確認" OR status = "已完成")', 
        [professional_id, formattedDate], (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(results);
          console.log("results:"+results)
        });
    });
    // 
    // await Promise.all 是一個用於等待多個 Promise 同時完成的 JavaScript 語法。
    // 當你有多個需要同時執行的非同步操作（例如多個 API 請求），並且需要等待它們都完成後進行後續操作時，可以使用 await Promise.all
    const appointmentData = await Promise.all(results.map(async appointment => {
      const { user_id, service_name, appointment_start_time } = appointment;

      const userInfo = await new Promise((resolve, reject) => {
        con.query('SELECT username, gender FROM users WHERE user_id = ?', 
          [user_id], (error, results) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(results[0]); // 假設結果是一筆資料
          });
      });

      return {
        user_id,
        service_name,
        appointment_start_time,
        username: userInfo.username,
        gender: userInfo.gender
      };
    }));
    // 將 appointmentData 依照 appointment_start_time 排序
    appointmentData.sort((a, b) => a.appointment_start_time.localeCompare(b.appointment_start_time));
    res.json(appointmentData);
  } catch (error) {
    console.error('資料庫查詢錯誤', error);
    res.status(500).json({ error: '資料庫查詢錯誤' });
  }
});


// personalsetting頁面部分開始
app.get('/get-user-info/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // 在数据库中查询用户信息
    const userInfo = await new Promise((resolve, reject) => {
      con.query('SELECT phone, address, date_of_birth, email FROM users WHERE user_id = ?', [userId], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        // 由于只查询一位用户，所以结果数组应该只包含一个元素
        const user = results[0];
        // 将日期格式从 '1985-09-22T16:00:00.000Z' 转换为 '1985-09-22'
        user.date_of_birth = user.date_of_birth.toISOString().split('T')[0];
        resolve(user);
      });
    });

    // 返回获取到的用户信息
    res.json(userInfo);
  } catch (error) {
    console.error('数据库查询错误', error);
    res.status(500).json({ error: '数据库查询错误' });
  }
});

app.post('/update-username/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const newUsername = req.body.newUsername;
  console.log("user_id"+user_id)
  // 这里需要编写代码来将 newUsername 更新到数据库中，具体操作取决于你使用的数据库系统和 ORM。

  // 假设你使用的是 MySQL 和 mysql2 模块，可以这样进行更新操作：
  const sql = 'UPDATE users SET username = ? WHERE user_id = ?';

  con.query(sql, [newUsername, user_id], (error, results) => {
    if (error) {
      console.error('更新用户名失败', error);
      res.status(500).json({ error: '更新用户名失败' });
    } else {
      console.log('用户名已更新');
      res.status(200).json({ message: '用户名已更新' });
    }
  });
});

app.post('/update-user-birthday/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const newBirthday = req.body.newBirthday;
  console.log("user_id"+user_id)
  // 这里需要编写代码来将 newUsername 更新到数据库中，具体操作取决于你使用的数据库系统和 ORM。

  // 假设你使用的是 MySQL 和 mysql2 模块，可以这样进行更新操作：
  const sql = 'UPDATE users SET date_of_birth = ? WHERE user_id = ?';

  con.query(sql, [newBirthday, user_id], (error, results) => {
    if (error) {
      console.error('更新用户生日失败', error);
      res.status(500).json({ error: '更新用户生日失败' });
    } else {
      console.log('用户名已更新');
      res.status(200).json({ message: '用户生日已更新' });
    }
  });
});

app.post('/update-user-phone/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const newPhonenumber = req.body.newPhonenumber;
  console.log("user_id:"+user_id)
  // 这里需要编写代码来将 newUsername 更新到数据库中，具体操作取决于你使用的数据库系统和 ORM。

  // 假设你使用的是 MySQL 和 mysql2 模块，可以这样进行更新操作：
  const sql = 'UPDATE users SET phone = ? WHERE user_id = ?';

  con.query(sql, [newPhonenumber, user_id], (error, results) => {
    if (error) {
      console.error('更新用户手機失败', error);
      res.status(500).json({ error: '更新用户手機失败' });
    } else {
      console.log('用户手機已更新');
      res.status(200).json({ message: '用户手機已更新' });
    }
  });
});

app.post('/update-user-email/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const newEmail = req.body.newEmail;
  console.log("user_id:"+user_id)
  // 这里需要编写代码来将 newUsername 更新到数据库中，具体操作取决于你使用的数据库系统和 ORM。

  // 假设你使用的是 MySQL 和 mysql2 模块，可以这样进行更新操作：
  const sql = 'UPDATE users SET email = ? WHERE user_id = ?';

  con.query(sql, [newEmail, user_id], (error, results) => {
    if (error) {
      console.error('更新用户email失败', error);
      res.status(500).json({ error: '更新用户email失败' });
    } else {
      console.log('用户email已更新');
      res.status(200).json({ message: '用户email已更新' });
    }
  });
});

app.post('/update-user-address/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  const newAddress = req.body.newAddress;
  console.log("user_id:"+user_id)
  // 这里需要编写代码来将 newUsername 更新到数据库中，具体操作取决于你使用的数据库系统和 ORM。

  // 假设你使用的是 MySQL 和 mysql2 模块，可以这样进行更新操作：
  const sql = 'UPDATE users SET address = ? WHERE user_id = ?';

  con.query(sql, [newAddress, user_id], (error, results) => {
    if (error) {
      console.error('更新用户address失败', error);
      res.status(500).json({ error: '更新用户address失败' });
    } else {
      console.log('用户address已更新');
      res.status(200).json({ message: '用户address已更新' });
    }
  });
});























// 監聽於 8080 端口(記得app.listen要改成server.listen)
server.listen(port, function () {
    console.log('Node app is running on port'+ port);
});
  