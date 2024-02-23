let express = require("express");
let axios = require("axios");
const mysql = require("mysql2");
const ejs = require('ejs');

let app = express();
let port = process.env.PORT || 8090;

app.use(express.static("public_html"));

//DB MySQL 정보 입력
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'guro',
  database: 'pharmacy',
  port: '3306',
});

//MySQL 연결여부 확인
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 오류: ' + err.stack);
    return;
  }
  console.log('MySQL에 성공적으로 연결되었습니다.');
});

//서버 실행 시 콘솔 출력
app.listen(port, function () {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});

// "/pharmach_list" 엔드포인트에 대한 GET 요청 처리
app.get("/pharmach_list", (req, res) => {
  let api = async () => { // 비동기 함수 정의: 외부 API에서 데이터를 가져오기
    let response = null;

    try {
      response = await axios.get("https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
        params: {
          "serviceKey": "gAMKsLf7G/+vybJyC2Q7M8XONi2ENAGhIWKNXw4B6WK2rmmuVQJ6GDHSt9TiKDzUbhEbbC9DW1DB6dmNTe8ENA==",
          "Q0": req.query.Q0,
          "Q1": req.query.Q1,
          "QT": req.query.QT,
          "QN": req.query.QN,
          "ORD": req.query.ORD,
          "pageNo": req.query.pageNo,
          "numOfRows": req.query.numOfRows
        }
      });
    } catch (e) {
      console.log(e);
    }
    return response;
  };
  
//DB에 약국 리스트 Data 삽입
  api().then((response) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(response.data.response.body);

    // pharmacy_data 테이블에 데이터 삽입
    insertPharmacyData(response.data.response.body.items.item);
  });

  // 파비콘을 사용하지 않을 경우, 무시하도록 함 (에러 안보이게 처리)
  app.get("/favicon.ico", (req, res) => {
    res.status(204).end();
  });
});

// "/pharmacy_search" 엔드포인트에 대한 GET 요청 처리
// app.get("/pharmacy_search", (req, res) => {
//   let api = async () => {
//     let response = null;

//     try {
//       response = await axios.get("https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
//         params: {
//           "serviceKey": "gAMKsLf7G/+vybJyC2Q7M8XONi2ENAGhIWKNXw4B6WK2rmmuVQJ6GDHSt9TiKDzUbhEbbC9DW1DB6dmNTe8ENA==",
//           "Q0": req.query.Q0,
//           "Q1": req.query.Q1,
//           "QT": req.query.QT,
//           "QN": req.query.QN,
//           "ORD": req.query.ORD,
//           "pageNo": req.query.pageNo,
//           "numOfRows": req.query.numOfRows
//         }
//       });
//     } catch (e) {
//       console.log(e);
//     }
//     return response;
//   };

//   api().then((response) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.json(response.data.response.body);
//   });

//   // 파비콘을 사용하지 않을 경우, 무시하도록 함 (에러 안보이게 처리)
//   app.get("/favicon.ico", (req, res) => {
//     res.status(204).end();
//   });
// });

// 주소 정보를 MySQL 에서 받아옴.
app.get('/', (request, response) => {
  fs.readFile('bookList.html', 'utf-8', (error, data) => {
    // 클라이언트에서 선택한 시, 군구, 동 정보
    const selectedSi = request.query.si;
    const selectedGu = request.query.gu;
    const selectedDong = request.query.dong;

    // 해당 정보를 이용하여 데이터베이스에서 조회
    const query = 'SELECT * FROM address WHERE si = ? AND gu = ? AND dong = ?';
    const values = [selectedSi, selectedGu, selectedDong];

    connection.query(query, values, (error, results, fields) => {
      if (error) throw error;

      // 조회된 결과를 클라이언트에게 전달
      response.send(ejs.render(data, {
        data: results,
      }));
    });
  });
});

function insertPharmacyData(pharmacyData) {
  pharmacyData.forEach((item) => {
    const checkDuplicateQuery = 'SELECT * FROM pharmacy_data WHERE dutyName = ? AND dutyAddr = ?';
    const checkDuplicateValues = [item.dutyName, item.dutyAddr];

    connection.query(checkDuplicateQuery, checkDuplicateValues, (err, results) => {
      if (err) {
        console.error('데이터 중복 확인 오류:', err);
      } else {
        if (results.length === 0) {
          // 중복된 데이터가 없으면 데이터 삽입
          const insertQuery = `
            INSERT INTO pharmacy_data (
              dutyName, dutyAddr, dutyTel1,
              wgs84Lat, wgs84Lon,
              dutyTime1s, dutyTime1c,
              dutyTime2s, dutyTime2c,
              dutyTime3s, dutyTime3c,
              dutyTime4s, dutyTime4c,
              dutyTime5s, dutyTime5c,
              dutyTime6s, dutyTime6c,
              dutyTime7s, dutyTime7c,
              dutyTime8s, dutyTime8c
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
            item.dutyName, item.dutyAddr, item.dutyTel1,
            item.wgs84Lat, item.wgs84Lon,
            item.dutyTime1s, item.dutyTime1c,
            item.dutyTime2s, item.dutyTime2c,
            item.dutyTime3s, item.dutyTime3c,
            item.dutyTime4s, item.dutyTime4c,
            item.dutyTime5s, item.dutyTime5c,
            item.dutyTime6s, item.dutyTime6c,
            item.dutyTime7s, item.dutyTime7c,
            item.dutyTime8s, item.dutyTime8c
          ];

          connection.query(insertQuery, values, (err, result) => {
            if (err) {
              console.error('데이터 삽입 오류:', err);
            } else {
              console.log('데이터가 성공적으로 삽입되었습니다.');
            }
          });
        }
      }
    });
  });
}

