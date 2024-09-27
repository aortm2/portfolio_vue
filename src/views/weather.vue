<template>
  <div class="weather">
    <p class="current-date">{{ currentDate }}</p>
    <div class="weather-wrap">
      <button class="weather-box" v-for="(weather, city) in weatherData" :key="city"
        :class="{ active: activeCity === city }" @click="toggleClass(city)">
        <div v-if="weather">
          <div class="city-info">
            <h4 class="city-name">{{ city }}</h4>
            <p class="temp">온도: {{ weather.temp }}°C</p>
            <div class="detail-info">
              <div class="wind-speed"><span>일 최저기온 :</span> {{ weather.tmn }}°C</div>
              <div class="wind-speed"><span>일 최고기온 :</span> {{ weather.tmx }}°C</div>
            </div>
          </div>
          <div class="city-weather" :class="[weather.bg]">
            <img v-if="weather" :src="weather.image" :alt="weather.description" />
            <p>{{ weather.description }}</p>
          </div>
          <div class="detail-info detail-bot">
            <div class="sky-condition"><span>하늘 :</span> {{ weather.skyCondition }}</div>
            <div class="wind-speed"><span>풍속 :</span> {{ weather.wsd }}</div>
            <div class="wind-speed"><span>습도 :</span> {{ weather.reh }}%</div>
            <div class="wind-speed"><span>강수확률 :</span> {{ weather.reh }}%</div>
          </div>
        </div>
        <div v-else>날씨 정보를 불러오지 못했습니다.</div>
      </button>
    </div>
    <div class="guide-txt">
      <p>각 지역를 <strong>클릭하시면 상세정보</strong>를 볼 수 있습니다.</p>
      <p class="sm">기상청 AIP를 사용하여 실제 날씨정보를 연동했습니다.</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 도시 좌표 설정
const cities = {
  서울: { nx: 60, ny: 127 },
  경기도: { nx: 60, ny: 120 },
  부산: { nx: 98, ny: 76 },
  대구: { nx: 89, ny: 90 },
  인천: { nx: 55, ny: 124 },
  광주: { nx: 58, ny: 74 },
};

const images = {
  clear: new URL(`/src/static/img/project/ico_clear.svg`, import.meta.url).href,
  rain: new URL(`/src/static/img/project/ico_rain.svg`, import.meta.url).href,
  cloudy: new URL(`/src/static/img/project/ico_cloudy.svg`, import.meta.url).href,
  snow: new URL(`/src/static/img/project/ico_snow.svg`, import.meta.url).href,
  drizzle: new URL(`/src/static/img/project/ico_drizzle.svg`, import.meta.url).href,
  sleet: new URL(`/src/static/img/project/ico_sleet.svg`, import.meta.url).href,
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
      numOfRows: 350,
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
      
      // 기온 및 날씨 정보를 추출 (항목 중에서 필요한 것만 추출)
      const temp = items.find((item) => item.category === 'TMP')?.fcstValue; // 온도
      const pty = items.find((item) => item.category === 'PTY')?.fcstValue; // 날씨
      const sky = items.find((item) => item.category === 'SKY')?.fcstValue; //하늘 상태
      const wsd = items.find((item) => item.category === 'WSD')?.fcstValue; //풍속
      const reh = items.find((item) => item.category === 'REH')?.fcstValue;  // 습도
      const pop = items.find((item) => item.category === 'POP')?.fcstValue; //강수확률
      const tmn = items.find((item) => item.category === 'TMN')?.fcstValue; //최저기온
      const tmx = items.find((item) => item.category === 'TMX')?.fcstValue; //최고기온

      let description = '';
      let image = '';
      let bg = '';
      switch (pty) {
        case '0':
          description = '맑음';
          image = images.clear;
          bg = '';
          break;
        case '1':
          description = '비';
          image = images.rain;
          bg=''
          break;
        case '2':
          description = '비/눈';
          image = images.drizzle;
          bg = 'gray';
          break;
        case '3':
          description = '눈';
          image = images.snow;
          bg = 'gray';
          break;
        case '4':
          description = '소나기';
          image = images.drizzle;
          bg = 'gray';
          break;
        case '5':
          description = '빗방울';
          image = images.rain;
          bg = '';
          break;
        case '6':
          description = '빙판';
          image = images.sleet;
          bg = 'gray';
          break;
        case '7':
          description = '흐림';
          image = images.cloudy;
          bg = '';
          break;
        default:
          description = '정보 없음';
          image = ''; // 기본 이미지
          break;
      }

      let skyCondition = '';
      // 하늘 상태
      switch (sky) {
        case '1':
          skyCondition = '맑음';
          break;
        case '3':
          skyCondition = '구름 많음';
          break;
        case '4':
          skyCondition = '흐림';
          break;
        default:
          skyCondition = '정보 없음';
          break;
      }

      weatherData.value[city] = {
        temp,
        description,
        image,
        bg,
        skyCondition,
        wsd,
        pop,
        reh,
        tmn,
        tmx
      };
     
    } catch (error) {
      console.error(`${city} 날씨 정보를 불러오는 중 오류 발생:`, error);
    }
  }
};

onMounted(() => {
  fetchWeather();
});

// 클릭
const activeCity = ref(null)

const toggleClass = (city) => {
  console.log(city)
  activeCity.value = activeCity.value === city ? null : city
}
</script>