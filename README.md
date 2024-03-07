# 프로젝트 소개
> 공공데이터를 이용해 약국 리스트를 데이터에 저장하고, 저장된 데이터를 지도에 출력하는 약국 지도입니다.\
> 사용자는 자신의 위치나 혹은 무작위 위치에 해당하는 시군구 약국 리스트를 제공 받으며,
> 마커를 클릭하여 해당 약국의 이름, 영업시간, 영업일, 전화번호 등 자세한 정보를 확인 할 수 있습니다.
> 
> JavaScript와 jQuery를 이용해 클라이언트 측에 REST API를 호출하도록 구현했으며,\
> Express.js 라이브러리를 사용하여 Node.js 서버를 실행 했습니다. 

> ### 개발 기간 및 인원
> 23.12.17 ~ 23.12.31 (2주) \
> 풀스택 1명

<br/>

# 기술 스택
![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

<br/>

# 주요 기능
### 약국 목록 출력하기
- 사용자는 현재 위치를 기반으로 한 약국의 목록을 네이게이션 바에서 리스트 형태로 확인 할 수 있다.
- 약국 목록은 약국의 이름과 주소를 포함하며, 사용자가 해당 약국을 선택하면 해당 위치로 지도가 이동하고 약국 정보가 표시된다.

### 약국 정보 표시하기
- 약국 마커를 클릭하면 해당 약국의 이름, 주소, 전화번호, 영업 시간 등의 정보를 확인할 수 있다.
- 각 약국 정보는 정보창을 통해 마커 위에 표시되며, 클릭시 마커의 목록 강조 및 스타일링이 변경된다.

### 지도에 위치 표시하기
- 사용자의 현재 위치와 주변 약국들의 위치를 지도 상에 마커로 표시된다.
- 사용자의 현재 위치는 다른 마커와 구별되는 스타일로 표시되어 시각적으로 구분된다.

### 지도 제어
- 사용자는 지도를 확대 또는 축소하여 원하는 지역을 자유롭게 이동 할 수 있다.
- 약국 목록을 클릭하면 해당 약국의 위치로 지도가 이동하고, 해당 약국의 마커가 강조된다.

<br/>

# 추가 구현하고 싶은 기능
### 검색 기능 추가
- 검색을 통해 내가 위치하지 않는 위치의 시군구에 해당하는 약국 데이터 정보를 확인 할 수 있다. 

### 사용자 편의성 개선
- UI/UX를 보다 사용자 친화적으로 개선하여 편의성을 높인다.
- 체크박스를 통해 가깝거나 자주 찾는 약국 리스트에 약국 정보를 저장할 수 있다.
