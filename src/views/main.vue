<template>
  <section id="section_01" class="top">
    <article>
      <div class="top-text">
        <h2 class="sliding-text">PORTFOLIO</h2>
        <span class="name">문정현</span>
      </div>
      <p class="greeting">이 홈페이지는 vue3로 제작 되었습니다.</p>
    </article>
  </section>

  <section id="section_02" class="about">
    <article>
      <h2 class="section-title">ABOUT ME</h2>
      <div class="about-wrap">
        <p class="about-txt">UI/UX에 관심이 많으며, 늘 새로운 영역을 탐구하는 것을 좋아합니다.</p>
        <p class="about-txt">웹 표준과 웹 접근성을 고려한 마크업을 중시하며, <br>웹 접근성 인증마크 획득을 한 프로젝트 경험도 다수 있습니다.<br>늘 사용자들이 사용하기 쉬운
          UX/UI를 만들기 위해 항상 고민합니다.</p>
        <p class="about-txt">항상 겸손한 마음을 가지며, 배움에는 끝이 없다고 생각합니다.<br>빠르게 변화하는 트렌드에 맞춰 항상 노력하겠습니다.</p>
        <p class="about-txt">감사합니다.</p>
      </div>
    </article>
  </section>

  <section id="section_03" class="project">
    <article>
      <ul class="project-list">
        <li>
          <button type="button" class="list">Project</button>
        </li>
        <li>
          <button type="button" class="list">Project</button>
        </li>
        <li>
          <button type="button" class="list">Project</button>
        </li>
        <li>
          <button type="button" class="list">Project</button>
        </li>
      </ul>
    </article>
  </section>

  <section id="section_04" class="history">
    <article>
      <h2 class="section-title">HISTORY</h2>
      <div class="history-article">
        <div v-for="(history, index) in historys" :key="index">
          <a :href="history.link" target="_blank">
            <div class="history-img">
              <img :src="imgPath + history.imgSrc + '.png'" />
            </div>
            <div class="history-info">
              <h4 class="history-title">{{ history.title }}</h4>
              <span class="history-company">{{ history.company }}</span>
              <p class="history-tags">{{ history.tags }}</p>
            </div>
          </a>
        </div>
      </div>
    </article>
  </section>

  <section id="section_05" class="contact">
        <article>
          <h2 class="section-title">CONTACT</h2>
          <div class="contact-wrap">
            <div>
              <strong class="contact-label">address</strong>
              <p class="contact">서울시 영등포구 신길동</p>
            </div>
            <div>
              <strong class="contact-label">E-mail</strong>
              <p class="contact">aortm2@gmail.com</p>
            </div>
            <div>
              <strong class="contact-label">web</strong>
              <p class="contact">https://aortm2.github.io/</p>
            </div>
          </div>
          <a href="mailto:aortm2@gmail.com" class="btn-primary">메일 보내기</a>
        </article>
      </section>
</template>
<script setup>

const imgPath = '/src/static/img/main/';

const historys = [
  {
    title: "The Hagwon",
    company: "hagwon",
    tags: "Cross-browsing / jQuery / Javascript",
    imgSrc: "hagwon",
    link: "https://www.thehagwon.com/common/greeting.do",
  },
  {
    title: "KODA교육협력센터",
    company: "한국부동산개발협회",
    tags: "Cross-browsing / jQuery / Javascript",
    imgSrc: "koda",
    link: "https://www.koda.or.kr/cmmn/index.do",
  },
  {
    title: "한국고용노동교육원",
    company: "한국고용노동교육원",
    tags: "Cross-browsing / jQuery / Javascript",
    imgSrc: "keli",
    link: "https://www.keli.kr/",
  },
  {
    title: "국립국어원 점자정보누리집",
    company: "국립국어원",
    tags: "Cross-browsing / jQuery / Javascript",
    imgSrc: "korea",
    link: "https://korean.go.kr/braille/common/greeting.do",
  },
  {
    title: "문화예술 내일",
    company: "한국문화예술위원회",
    tags: "Cross-browsing / jQuery / Javascript",
    imgSrc: "arko",
    link: "https://hrd.arko.or.kr/common/greeting.do",
  },
];



</script>