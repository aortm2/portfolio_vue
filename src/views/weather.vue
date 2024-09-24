<template>
  <div class="weather">
    <p class="current-date">{{ currentDate }}</p>
    <div class="weather-wrap" >
      <div class="weather-box" v-for="(weather, city) in weatherData" :key="city">
        <div v-if="weather">
          <div class="city-info">
            <h4 class="city-name">{{ city }}</h4>
            <p class="temp">온도: {{ weather.temp }}°C</p>
          </div>
          <div class="city-weather">
            <p>날씨: {{ weather.description }}</p>
            <!-- <img v-if="weather" :src="weather.image" :alt="weather.description" /> -->
          </div>
        </div>
        <div v-else>날씨 정보를 불러오지 못했습니다.</div>
      </div>
    </div>
   
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 도시 좌표 설정
const cities = {
  서울: { nx: 60, ny: 127 },
  부산: { nx: 98, ny: 76 },
  대구: { nx: 89, ny: 90 },
  인천: { nx: 55, ny: 124 },
  광주: { nx: 58, ny: 74 },
};

const images = {
  clear: '', // 맑음 
  rain: '',   // 비
  cloudy: '', // 흐림 
  snow: '',   // 눈
  drizzle: '', // 소나기
  sleet: '', // 빙판
};

const weatherData = ref({});
const currentDate = ref('');

// 날씨 데이터를 가져오는 함수
const fetchWeather = async () => {
  const apikey = '9YgjirZQgncI7TZtUVU308Y7pYUMZU3lhPLtli7PhNeKArO7ukZTDK95svn+bFCGP3L45jzPZrs7LHmwwY6xXQ==';
  const baseUrl = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const base_date = `${year}${month}${day}`;
  const base_time = '0500';
  currentDate.value = `${year}-${month}-${day}`;

  // 각 도시별로 날씨 정보를 가져옴
  for (const city in cities) {
    const { nx, ny } = cities[city];
    const params = {
      ServiceKey: apikey,
      numOfRows: 10,
      pageNo: 1,
      dataType: 'JSON',
      base_date,
      base_time,
      nx,
      ny,
    };

    try {
      const response = await axios.get(baseUrl, { params });
      // 응답 데이터에서 필요한 항목을 추출하여 저장
      const items = response.data?.response?.body?.items?.item;
      console.log(items)
      
      // 기온 및 날씨 정보를 추출 (항목 중에서 필요한 것만 추출)
      const temp = items.find((item) => item.category === 'TMP')?.fcstValue;
      const pty = items.find((item) => item.category === 'PTY')?.fcstValue;

      let description = '';
      let image = '';
      switch (pty) {
        case '0':
          description = '맑음';
          image = images.clear;
          break;
        case '1':
          description = '비';
          image = images.rain;
          break;
        case '2':
          description = '비/눈';
          image = images.drizzle;
          break;
        case '3':
          description = '눈';
          image = images.snow;
          break;
        case '4':
          description = '소나기';
          image = images.drizzle; // 소나기 이미지 추가
          break;
        case '5':
          description = '빗방울';
          image = images.rain; // 빗방울 이미지 추가
          break;
        case '6':
          description = '빙판';
          image = images.sleet; // 빙판 이미지 추가
          break;
        case '7':
          description = '흐림';
          image = images.cloudy; // 흐림 이미지 추가
          break;
        default:
          description = '정보 없음';
          image = ''; // 기본 이미지
          break;
      }
      
      weatherData.value[city] = {
        temp,
        description,
        image,
      };
     
    } catch (error) {
      console.error(`${city} 날씨 정보를 불러오는 중 오류 발생:`, error);
    }
  }
};

onMounted(() => {
  fetchWeather();
});
</script>