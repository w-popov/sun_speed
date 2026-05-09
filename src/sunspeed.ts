/**
 * Попов Вячеслав Геннадьевич
 * 'Колесо обозрения' Солнце Москвы'
 * Москва 2025/2026
 */

import { LitElement, html, svg, unsafeCSS, css, type SVGTemplateResult, nothing, type HTMLTemplateResult } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import bootstrapStyles from 'bootstrap/dist/css/bootstrap.min.css?inline';

// Константы колеса обозрения
const WheelConstants = {
  REAL_RADIUS_MM : 59900, // Реальный радиус колеса обозрения в мм 58940

} as const;

// Время
type TimeFrmt = {
  hour: number;
  min: number;
  sec: number
};


/**
 * Разница времени 
 * @param time1 начало. формат: '00:00:00'
 * @param time2 конец. формат: '00:00:00'
 * @returns hour, min, sec -- часов, минут, секунд
 */
const diffTime = (time1: Date, time2: Date): TimeFrmt => {
  const totalSeconds = Math.floor((time2.getTime() - time1.getTime()) / 1000);
  return {
    hour: Math.floor(totalSeconds / 3600),
    min: Math.floor((totalSeconds % 3600) / 60),
    sec: totalSeconds % 60
  };
};

const logosvg = (): SVGTemplateResult => svg `
  <svg width="120" height="auto" viewBox="0 0 260 68" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M87.5486 16.02C86.4617 15.535 85.278 15.3057 84.0886 15.35C82.4283 15.35 80.836 16.0095 79.6621 17.1835C78.4881 18.3575 77.8286 19.9498 77.8286 21.61C77.8286 23.2703 78.4881 24.8625 79.6621 26.0365C80.836 27.2105 82.4283 27.87 84.0886 27.87C85.0417 27.8714 85.9836 27.6634 86.8475 27.2608C87.7115 26.8582 88.4765 26.2707 89.0886 25.54L90.7385 27.2C89.9009 28.1366 88.8765 28.8873 87.7312 29.404C86.5858 29.9207 85.345 30.1919 84.0886 30.2C81.8156 30.2 79.6358 29.2971 78.0286 27.6899C76.4215 26.0827 75.5186 23.9029 75.5186 21.63C75.5186 19.3571 76.4215 17.1773 78.0286 15.5701C79.6358 13.9629 81.8156 13.06 84.0886 13.06C86.1315 13.0468 88.1349 13.6232 89.8586 14.72V17.52H87.8586L87.5486 16.02Z" fill="white"/>
  <path d="M109.449 21.61C109.496 23.3575 109.022 25.0795 108.086 26.556C107.15 28.0325 105.795 29.1964 104.194 29.899C102.593 30.6015 100.82 30.8107 99.0993 30.5C97.379 30.1892 95.7904 29.3726 94.5366 28.1544C93.2827 26.9362 92.4206 25.3718 92.0604 23.6611C91.7002 21.9505 91.8583 20.1713 92.5144 18.5509C93.1705 16.9306 94.2949 15.5427 95.7438 14.5646C97.1927 13.5865 98.9004 13.0626 100.649 13.06C102.942 13.0514 105.148 13.9417 106.793 15.5399C108.438 17.1381 109.391 19.3172 109.449 21.61ZM94.1786 21.61C94.1307 22.9012 94.4699 24.1772 95.1527 25.2742C95.8355 26.3711 96.8306 27.2389 98.0102 27.7661C99.1899 28.2933 100.5 28.4558 101.773 28.2327C103.046 28.0096 104.222 27.4112 105.153 26.5142C106.083 25.6172 106.723 24.4627 106.992 23.1989C107.261 21.9352 107.146 20.6198 106.662 19.4219C106.178 18.2239 105.347 17.1981 104.275 16.4761C103.204 15.7541 101.941 15.3689 100.649 15.37C98.9643 15.3535 97.3406 15.9975 96.1256 17.164C94.9105 18.3304 94.2008 19.9265 94.1486 21.61H94.1786Z" fill="white"/>
  <path d="M110.149 27.87H111.719C112.109 27.87 112.569 27.41 112.799 26.34L115.029 15.2L113.389 14.97V13.12H125.909V30.12H123.599V15.2H117.339L115.149 26.34C114.709 28.54 113.599 30.18 111.729 30.18L110.159 29.95L110.149 27.87Z" fill="white"/>
  <path d="M141.149 20.34V13.13H143.459V30.13H141.149V22.44H131.449V30.13H129.149V13.13H131.459V20.34H141.149Z" fill="white"/>
  <path d="M159.769 33.58L159.539 30.11H146.599V13.11H148.909V28.01H157.909V13.11H160.219V28.01H161.839V33.56L159.769 33.58Z" fill="white"/>
  <path d="M177.419 28.2V30.2H164.489V13.2H176.729V15.05H166.799V20.52H174.879V22.37H166.799V28.2H177.419Z" fill="white"/>
  <path d="M87.9886 37.75H92.1486V54.75H89.8586V39.75H89.6286L85.6286 48.53H82.0486L77.9886 39.75H77.7786V54.75H75.4686V37.75H79.6486L83.6486 46.52H83.8786L87.9886 37.75Z" fill="white"/>
  <path d="M112.529 46.2C112.578 47.9479 112.106 49.6708 111.171 51.1486C110.236 52.6264 108.882 53.7919 107.282 54.4959C105.681 55.2 103.907 55.4107 102.186 55.1011C100.465 54.7915 98.8754 53.9757 97.6206 52.758C96.3657 51.5402 95.5026 49.9759 95.1416 48.265C94.7805 46.5541 94.9379 44.7744 95.5937 43.1535C96.2495 41.5325 97.3738 40.144 98.8229 39.1654C100.272 38.1868 101.98 37.6627 103.729 37.66C106.02 37.6514 108.225 38.5402 109.869 40.1363C111.514 41.7324 112.469 43.9089 112.529 46.2ZM97.2586 46.2C97.2067 47.4943 97.5433 48.7744 98.225 49.8758C98.9068 50.9772 99.9025 51.8494 101.084 52.3801C102.266 52.9109 103.579 53.0759 104.855 52.854C106.131 52.6321 107.312 52.0334 108.245 51.135C109.178 50.2365 109.821 49.0794 110.091 47.8126C110.361 46.5457 110.246 45.227 109.76 44.0263C109.274 42.8255 108.44 41.7975 107.365 41.0746C106.29 40.3518 105.024 39.9671 103.729 39.97C102.052 39.9638 100.439 40.6108 99.231 41.7738C98.0232 42.9367 97.3158 44.5243 97.2586 46.2Z" fill="white"/>
  <path d="M126.729 40.63C125.64 40.1496 124.458 39.9206 123.269 39.96C122.213 39.978 121.179 40.2623 120.263 40.7865C119.346 41.3107 118.577 42.0577 118.026 42.9584C117.476 43.8591 117.161 44.8843 117.113 45.9389C117.064 46.9934 117.282 48.0433 117.747 48.991C118.212 49.9388 118.909 50.7538 119.773 51.3605C120.637 51.9671 121.64 52.3458 122.689 52.4614C123.739 52.577 124.8 52.4257 125.776 52.0217C126.751 51.6176 127.608 50.9738 128.269 50.15L129.909 51.79C129.071 52.7265 128.047 53.4773 126.901 53.994C125.756 54.5107 124.515 54.7818 123.259 54.79C122.108 54.8293 120.961 54.6366 119.886 54.2233C118.812 53.8101 117.831 53.1848 117.003 52.3846C116.175 51.5845 115.517 50.6259 115.067 49.566C114.617 48.506 114.386 47.3664 114.386 46.215C114.386 45.0636 114.617 43.924 115.067 42.864C115.517 41.8041 116.175 40.8455 117.003 40.0453C117.831 39.2452 118.812 38.6199 119.886 38.2066C120.961 37.7934 122.108 37.6007 123.259 37.64C125.303 37.6252 127.308 38.2054 129.029 39.31V42.1H127.029L126.729 40.63Z" fill="white"/>
  <path d="M146.769 54.56L145.849 54.8C145.2 54.7831 144.571 54.5772 144.038 54.2077C143.505 53.8382 143.092 53.3212 142.849 52.72L140.659 48.05C140.579 47.7836 140.423 47.5466 140.21 47.3686C139.996 47.1907 139.735 47.0799 139.459 47.05H134.459V54.75H132.149V37.75H134.459V44.95H139.059C139.321 44.9289 139.572 44.8301 139.778 44.6663C139.985 44.5025 140.138 44.281 140.219 44.03L142.219 39.82C142.461 39.2192 142.875 38.7028 143.408 38.3349C143.941 37.9669 144.571 37.7636 145.219 37.75L145.919 37.98V40.06H145.149C144.779 40.06 144.439 40.38 144.149 40.96L142.239 45.16C142.105 45.4179 141.905 45.6354 141.659 45.79C142.085 46.0732 142.429 46.4627 142.659 46.92L144.809 51.58C145.059 52.16 145.409 52.49 145.809 52.49H146.729L146.769 54.56Z" fill="white"/>
  <path d="M157.149 37.75C157.755 37.7473 158.356 37.8652 158.917 38.0966C159.477 38.3281 159.986 38.6686 160.414 39.0984C160.842 39.5282 161.181 40.0388 161.41 40.6004C161.639 41.162 161.754 41.7635 161.749 42.37C161.741 43.0397 161.576 43.6982 161.267 44.2923C160.957 44.8864 160.513 45.3995 159.969 45.79C160.709 46.1853 161.329 46.7729 161.764 47.4909C162.198 48.2089 162.431 49.0307 162.439 49.87C162.439 51.1572 161.928 52.3919 161.019 53.303C160.109 54.2141 158.876 54.7273 157.589 54.73H149.019V37.73L157.149 37.75ZM157.149 44.95C157.781 44.8784 158.365 44.5753 158.788 44.099C159.211 43.6227 159.443 43.0069 159.439 42.37C159.454 41.7332 159.225 41.1147 158.799 40.6408C158.374 40.1669 157.783 39.8733 157.149 39.82H151.329V44.95H157.149ZM157.589 52.65C158.286 52.5966 158.937 52.2794 159.409 51.7629C159.881 51.2465 160.138 50.5695 160.129 49.87C160.139 49.1641 159.884 48.48 159.413 47.9538C158.943 47.4275 158.291 47.0978 157.589 47.03H151.329V52.65H157.589Z" fill="white"/>
  <path d="M165.149 37.75H167.459V43.41H172.519C174.02 43.41 175.459 44.0063 176.521 45.0678C177.582 46.1292 178.179 47.5689 178.179 49.07C178.179 50.5711 177.582 52.0108 176.521 53.0722C175.459 54.1337 174.02 54.73 172.519 54.73H165.149V37.75ZM172.519 52.6C173.405 52.5523 174.24 52.1665 174.851 51.5219C175.462 50.8773 175.802 50.0231 175.802 49.135C175.802 48.2469 175.462 47.3927 174.851 46.7481C174.24 46.1035 173.405 45.7177 172.519 45.67H167.459V52.6H172.519ZM182.239 54.73H179.949V37.73H182.259L182.239 54.73Z" fill="white"/>
  <path d="M61.1486 29.08C60.9061 29.0816 60.6659 29.1256 60.4386 29.21C60.2551 26.9368 59.7985 24.694 59.0786 22.53C59.6621 22.5088 60.2132 22.2566 60.6108 21.8291C61.0084 21.4015 61.2198 20.8335 61.1986 20.25C61.1774 19.6665 60.9252 19.1154 60.4976 18.7178C60.0701 18.3202 59.5021 18.1088 58.9186 18.13C58.3897 18.1335 57.8794 18.3249 57.4786 18.67C56.3954 16.5418 55.0518 14.5565 53.4786 12.76C53.781 12.596 54.0407 12.3635 54.2369 12.0809C54.4331 11.7984 54.5603 11.4738 54.6084 11.1331C54.6564 10.7925 54.6239 10.4454 54.5134 10.1196C54.403 9.79387 54.2177 9.49853 53.9724 9.25735C53.7272 9.01617 53.4287 8.83587 53.1012 8.73091C52.7736 8.62596 52.426 8.59929 52.0862 8.65303C51.7464 8.70677 51.424 8.83943 51.1448 9.04036C50.8656 9.24129 50.6374 9.50489 50.4786 9.81C48.6837 8.26082 46.7056 6.93761 44.5886 5.87C44.9428 5.47397 45.1386 4.9613 45.1386 4.42999C45.1585 3.84652 44.9458 3.27905 44.5472 2.8524C44.1487 2.42576 43.5971 2.17489 43.0136 2.155C42.4301 2.13511 41.8626 2.34781 41.436 2.74632C41.0093 3.14484 40.7585 3.69652 40.7386 4.28C38.4729 3.52612 36.1208 3.06242 33.7386 2.89999C33.814 2.67759 33.8545 2.44481 33.8586 2.20999C33.8586 1.62386 33.6257 1.06175 33.2113 0.647293C32.7968 0.232838 32.2347 0 31.6486 0C31.0624 0 30.5003 0.232838 30.0859 0.647293C29.6714 1.06175 29.4386 1.62386 29.4386 2.20999C29.4426 2.44481 29.4831 2.67759 29.5586 2.89999C27.1763 3.06242 24.8242 3.52612 22.5586 4.28C22.5387 3.69652 22.2878 3.14484 21.8612 2.74632C21.4345 2.34781 20.8671 2.13511 20.2836 2.155C19.7001 2.17489 19.1484 2.42576 18.7499 2.8524C18.3514 3.27905 18.1387 3.84652 18.1586 4.42999C18.1586 4.9613 18.3544 5.47397 18.7086 5.87C16.5916 6.93761 14.6135 8.26082 12.8186 9.81C12.6631 9.49768 12.4355 9.22683 12.1546 9.01981C11.8738 8.81278 11.5478 8.67552 11.2034 8.61935C10.8591 8.56319 10.5063 8.58971 10.1742 8.69676C9.84215 8.80381 9.54031 8.98831 9.2936 9.23502C9.04689 9.48172 8.8624 9.78358 8.75535 10.1156C8.6483 10.4477 8.62176 10.8005 8.67793 11.1448C8.7341 11.4892 8.87136 11.8152 9.07838 12.0961C9.28541 12.3769 9.55626 12.6045 9.86858 12.76C8.29538 14.5565 6.95174 16.5418 5.86858 18.67C5.54962 18.3905 5.15665 18.2091 4.73699 18.1477C4.31734 18.0863 3.88888 18.1475 3.5032 18.3239C3.11753 18.5004 2.79108 18.7846 2.56317 19.1423C2.33525 19.4999 2.21559 19.9159 2.21858 20.34C2.21981 20.8967 2.43203 21.4322 2.81245 21.8386C3.19287 22.245 3.7132 22.492 4.26858 22.53C3.60378 24.6975 3.20092 26.9367 3.06858 29.2C2.84129 29.1156 2.60101 29.0716 2.35858 29.07C2.05652 29.0496 1.75351 29.0916 1.46833 29.1932C1.18315 29.2948 0.921884 29.4539 0.700738 29.6606C0.479591 29.8674 0.30328 30.1173 0.18274 30.3951C0.0621991 30.6728 0 30.9723 0 31.275C0 31.5777 0.0621991 31.8772 0.18274 32.155C0.30328 32.4327 0.479591 32.6826 0.700738 32.8894C0.921884 33.0961 1.18315 33.2552 1.46833 33.3568C1.75351 33.4584 2.05652 33.5003 2.35858 33.48C2.58634 33.4792 2.81252 33.4421 3.02858 33.37C3.18365 35.8365 3.65415 38.273 4.42858 40.62C4.08014 40.6439 3.74241 40.7505 3.44332 40.9308C3.14422 41.1111 2.89236 41.3601 2.70857 41.6571C2.52477 41.9541 2.41432 42.2905 2.38636 42.6387C2.35839 42.9868 2.41371 43.3366 2.54775 43.6591C2.68178 43.9816 2.89067 44.2676 3.15714 44.4934C3.42361 44.7191 3.74 44.8782 4.08015 44.9575C4.4203 45.0367 4.77442 45.0338 5.11324 44.9491C5.45205 44.8643 5.76581 44.7001 6.02858 44.47C7.10661 46.5982 8.45071 48.5807 10.0286 50.37C9.58605 50.595 9.23217 50.9624 9.02395 51.4131C8.81574 51.8637 8.76532 52.3714 8.88083 52.8542C8.99633 53.337 9.27103 53.7669 9.66066 54.0745C10.0503 54.3821 10.5321 54.5496 11.0286 54.55C11.443 54.5557 11.8506 54.4442 12.2045 54.2283C12.5583 54.0125 12.844 53.7011 13.0286 53.33C15.1317 55.153 17.49 56.6589 20.0286 57.8L16.6186 66.03H8.75858V67.63H54.6986V66.03H46.8686L43.4586 57.81C46.0195 56.6664 48.4009 55.1574 50.5286 53.33C50.7501 53.7758 51.1164 54.1333 51.5674 54.344C52.0184 54.5548 52.5276 54.6063 53.0117 54.4902C53.4958 54.3741 53.9262 54.0973 54.2326 53.7049C54.539 53.3125 54.7033 52.8278 54.6986 52.33C54.7019 51.916 54.5895 51.5094 54.3739 51.156C54.1583 50.8025 53.8482 50.5165 53.4786 50.33C55.0564 48.5407 56.4005 46.5582 57.4786 44.43C57.8756 44.7826 58.3876 44.9781 58.9186 44.98C59.5021 45.0012 60.0701 44.7898 60.4976 44.3922C60.9252 43.9946 61.1774 43.4435 61.1986 42.86C61.2198 42.2765 61.0084 41.7085 60.6108 41.2809C60.2132 40.8533 59.6621 40.6012 59.0786 40.58C59.8578 38.2343 60.3284 35.7972 60.4786 33.33C60.6946 33.4021 60.9208 33.4392 61.1486 33.44C61.4506 33.4604 61.7536 33.4184 62.0388 33.3168C62.324 33.2152 62.5853 33.0561 62.8064 32.8494C63.0276 32.6426 63.2039 32.3926 63.3244 32.1149C63.445 31.8372 63.5072 31.5377 63.5072 31.235C63.5072 30.9323 63.445 30.6327 63.3244 30.355C63.2039 30.0773 63.0276 29.8274 62.8064 29.6206C62.5853 29.4139 62.324 29.2548 62.0388 29.1532C61.7536 29.0516 61.4506 29.0096 61.1486 29.03V29.08ZM33.8186 60.26C36.6164 60.0508 39.3688 59.4343 41.9886 58.43L45.1486 66.04H18.2986L21.4586 58.42C24.0796 59.4334 26.8361 60.0534 29.6386 60.26C31.0304 60.3503 32.4267 60.3503 33.8186 60.26ZM40.0086 53.65L32.5286 55.13V35.6L32.8486 36.38L40.0086 53.65ZM34.0086 34.98L47.8186 48.8L41.4786 53.04L34.0086 34.98ZM35.1486 33.85L53.1486 41.33L48.9086 47.67L35.1486 33.85ZM35.7586 32.38H55.2886L53.7986 39.86L35.7586 32.38ZM35.7586 30.78L53.7586 23.3L55.2386 30.78H35.7586ZM35.1486 29.3L48.9486 15.49L53.1486 21.83L35.1486 29.3ZM34.0086 28.2L41.4786 10.15L47.8186 14.39L34.0086 28.2ZM32.5286 27.59V8.02L40.0086 9.50999L32.5286 27.59ZM35.0786 31.59C35.0707 32.2508 34.8675 32.8945 34.4947 33.4401C34.1218 33.9858 33.5959 34.4089 32.9831 34.6563C32.3703 34.9038 31.698 34.9644 31.0508 34.8307C30.4037 34.6969 29.8105 34.3748 29.346 33.9047C28.8815 33.4346 28.5664 32.8377 28.4403 32.189C28.3143 31.5403 28.3829 30.8687 28.6376 30.2589C28.8923 29.6491 29.3216 29.1283 29.8716 28.7619C30.4216 28.3956 31.0677 28.2 31.7286 28.2C32.171 28.2 32.6091 28.2876 33.0175 28.4578C33.4259 28.6281 33.7966 28.8775 34.1081 29.1918C34.4195 29.506 34.6657 29.8789 34.8322 30.2888C34.9988 30.6987 35.0825 31.1376 35.0786 31.58V31.59ZM30.9286 35.59V55.13L23.4486 53.64L30.9286 35.59ZM30.9286 27.59L23.4486 9.50999L30.9286 8.03V27.59ZM29.4486 28.2L15.6386 14.36L21.9786 10.12L29.4486 28.2ZM28.3286 29.33L10.2686 21.86L14.5086 15.52L28.3286 29.33ZM27.7086 30.81H8.14858L9.63858 23.33L27.7086 30.81ZM27.7086 32.41L9.70858 39.89L8.14858 32.38L27.7086 32.41ZM28.3286 33.88L14.5086 47.67L10.2686 41.33L28.3286 33.88ZM29.4586 35.01L29.1286 35.79L21.9686 53.06L15.6486 48.83L29.4586 35.01ZM22.8086 55.2L31.7286 56.97L40.6286 55.2L41.3786 57.02C35.1547 59.3796 28.2824 59.3796 22.0586 57.02L22.8086 55.2ZM50.9486 50.83C48.6151 53.1539 45.8813 55.0375 42.8786 56.39L42.1486 54.54L49.6986 49.54L55.1486 41.28L57.0786 31.59L55.1486 21.89L49.6486 13.66L41.4286 8.2L31.7386 6.2L22.0386 8.2L13.8086 13.7L8.31858 21.92L6.38858 31.61L8.30858 41.31L13.8086 49.54L21.3386 54.54L20.5886 56.36C17.588 55.0133 14.857 53.1327 12.5286 50.81C8.73442 47.0099 6.15189 42.1704 5.10735 36.903C4.06281 31.6357 4.60314 26.1769 6.66007 21.2165C8.71699 16.2561 12.1982 12.0168 16.6637 9.03432C21.1292 6.05181 26.3786 4.45996 31.7486 4.45996C37.1185 4.45996 42.3679 6.05181 46.8335 9.03432C51.299 12.0168 54.7802 16.2561 56.8371 21.2165C58.894 26.1769 59.4343 31.6357 58.3898 36.903C57.3453 42.1704 54.7627 47.0099 50.9686 50.81L50.9486 50.83Z" fill="white"/>
  </svg>
`;

/**
 * Создать окружность SVG
 */
const createCircleSVG = (radius: string, center: string): SVGCircleElement => {
    const centerX = center;
    const centerY = center;
    const circle: SVGCircleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", centerX);
    circle.setAttribute("cy", centerY);
    circle.setAttribute("r", radius);
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke", "rgb(229, 229, 229)");
    circle.setAttribute("stroke-width", "0.5");
    return circle;
};


/**
 * Lit компонент <sun-speed></sun-speed>
 */
@customElement('sun-speed')
export class SunSpeed extends LitElement {
  static styles = css`${unsafeCSS(bootstrapStyles)}
  
  #idtitle {
    padding: 5px 10px;
    text-align: left;
    //background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%);
    background-color: #d44b3fee;
    color: whitesmoke;
  }

  .form-check-input:checked{
   background-color: limegreen !important;
   border: 0;
  }

  .shadow-style {
    -webkit-box-shadow: 0px 1px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 1px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 1px 8px 0px rgba(34, 60, 80, 0.2);
  }
  
  `;

  
  // ID для requestAnimationFrame колеса обозрения
  private rafWheelId: number | null = null;
  // ID для requestAnimationFrame поиск угла кабины в заданное время
  private rafFindAngleCabin: number | null = null;
  
 

  // текущий угол кабины
  private angle: number = 0;

  // остальные кабины
  private cabins: SVGRectElement[] = [];

  private stopTimeDate!: Date;
  private startTimeDate!: Date;

  // SVG лучи <угол, SVGLine>
  private rays : Map<number, SVGLineElement> = new Map<number, SVGLineElement>();

  constructor () {
    super();
  }

  protected firstUpdated() {
    this.updateClock();
    this._printRay();
    this._createCabins();
  }

  connectedCallback() {
    super.connectedCallback();
    
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  // svg элементы доступны после firstUpdated()
  /**
   * svg колесо обозрения
   */
  @query('#wheel')
  wheel!: SVGSVGElement;

  /**
   * группа svg колеса обозрения
   */
  @query('#wheel-group')
  wheelGroup!: SVGGElement;

  /**
   * эллипс колеса обозрения
   */
  @query('#wheel-ellipse')
  wheelEllipse!: SVGEllipseElement;

  /**
   * кабина №1
   */
  @query('#cabin0')
  cabin0!: SVGRectElement;


  /**
   * текстовый svg элемент для отображения угла 
   */
  @query('#angle-value')
  angleSVGTextValue!: SVGTextElement;

  /** Текущая дата */
  @property({type: String})
  currentDate: string = new Date().toLocaleDateString();

  /** Текущее время */
  @property({type: String})
  currentTime: string = new Date().toLocaleTimeString();

  /**
   * Время старта
   */
  @property({type: String})
  startTime: string = "00:00:00";  

  /**
   * Время останова
   */
  @property({type: String})
  stopTime: string = "00:00:00";

  /**
   * Разница времени
   */
  @property({type: String})
  diffTime: string = ""
  
  /**
   * флаг для включения/выключения вращения
   */
  @property({type: Boolean})
  isCheckedStart: boolean = false;

  /**
   * текущий угол кабины
   */
  @property({type: Number})
  degangle: number = 0;

  @state()
  degsCabin: Array<string> = [];

  /**
   * задать текущий угол кабины
   */
  @property({type: String})
  currentAngleCabin1: string = "0";

  /**
   * скорость вращения колеса
   */
  @property({type: String})
  speedWheel: string = "330";

  /**
   * Коррекция скорости
   */
  @property({type: Number})
  lambda: number = WheelConstants.REAL_RADIUS_MM;


  // Целевое время
  /**
   * Час
   */
  @property({type: String})
  targetHour: string = (new Date().getHours()).toString();

  @property({type: String})
  targetMin: string = (new Date().getMinutes() + 1).toString();

  @property({type: String})
  targetSec: string = "0";

  /**
   * Целевой угол град.
   */
  @property({type: Number})
  targetAngle: number = 0;


  //- - - - - - - - - - - - - - - - - - - - - - - - - -
  /**
   * реденринг компонента
   * @returns 
   */
  protected render() {
    return html`
      <div id="idtitle" class="fixed-top d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start" style="width: 80px;"><span>${this.currentDate}</span></div>
        <div class="d-flex justify-content-end" style="width: 160px;">
          ${logosvg()}
        </div>
      </div>
      
      <div class="container mt-5">
        <div class="row align-items-stretch">
          <div class="col-lg-6">
            ${this._svgWheel()}
          </div>
          
          <div class="col-lg-6">
            <div class="w-100 px-0">
              <h4 class="text-center">Положение 1-й кабины:</h4>
              
              
            <div class="card shadow-style w-100" style="margin-bottom: 10px;">
              <div class="card-body">

                <div class="d-grid gap-2 mb-2 d-md-flex justify-content-md-end">
                  <div class="form-check form-switch">
                    <input class="form-check-input" style="transform: scale(1.4);" type="checkbox" @change="${this._toggleStart}" ?checked="${this.isCheckedStart}" id="checkNativeSwitch" switch>
                    <label class="form-check-label ms-2" for="checkNativeSwitch">
                      Крутить
                    </label>
                  </div>
                </div>
                <div class="d-flex flex-wrap align-items-center">
                  <p class="me-3 mb-2 mb-md-0 fw-normal" id="dangle">Угол кабины: ${this.degangle.toFixed(2)}°</p>
                  <p class="me-3 mb-2 mb-md-0 fw-normal" id="speedwheel">Скорость: ${this.speedWheel}</p>
                  <p class="me-3 mb-2 mb-md-0 fw-normal" id="currentTime">Время: ${this.currentTime}</p>

                </div>
              </div>
            </div>
            <!--  -->
            <div class="card shadow-style w-100" style="margin-bottom: 10px;">
              <div class="card-body"> 
                
              <div class="d-flex flex-wrap align-items-center">

                <div class="mb-1 me-4 mb-2 mb-md-0" style="width: 80px;">
                  <label for="setSpeedWheel" class="form-label fw-light">Скорость mm/s:</label>
                  <input type="number" class="form-control" id="setSpeedWheel" 
                  .value="${this.speedWheel}"
                  @input="${(e: Event) => {
                    const input = e.target as HTMLInputElement;
                    this.speedWheel = input.value || "0";
                    if (this.isCheckedStart) { this.reload(); }
                  }}"
                  min="100" max="5000" step="1">
                </div>

                <div class="mb-1 me-4 mb-2 mb-md-0" style="width: 80px;">
                  <label for="setAngleCabin1" class="form-label fw-light">Задать угол:</label>
                  <input type="number" class="form-control" id="setAngleCabin1" 
                  .value="${this.currentAngleCabin1}"
                  @input="${(e: Event) => {
                    const input = e.target as HTMLInputElement;
                    this.currentAngleCabin1 = input.value || "0";
                    this.degangle = parseFloat(input.value || "0");
                    this._setCabinPositionByAngle();
                    if (this.isCheckedStart) { 
                      this.reload();
                    } else {
                      this.start();
                      this.stop();
                    }
                  }}"
                  min="0" max="360" step="1">
                </div>

                <div class="mb-1 me-4 mt-4 mb-md-0" style="width: 160px;">
                  <table class="table table-bordered align-middle">
                    <thead style="text-align: center;">
                      <tr>
                        <th class="fs-6 fw-light" scope="col">старт</th>
                        <th class="fs-6 fw-light" scope="col">конец</th>
                        ${this.diffTime ? html`<th class="fs-6 fw-light" scope="col">&Delta;t</th>` : nothing}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>${this.startTime}</td>
                        <td>${this.stopTime}</td>
                        ${this.diffTime ? html`<td>${this._getDiffTime()}</td>` : nothing}
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
            <!--  -->

            <div class="card shadow-style  w-100" style="margin-bottom: 10px;">
              <div class="card-body">
                <div class="mb-2"><p class="fw-light ">Задать время:</p></div>
                <div class="d-flex flex-wrap align-items-center">

                  <div class="input-group input-group-sm mb-3 me-2" style="width: 90px;">
                    <span class="input-group-text" id="targetHour">час</span>
                    <input type="number" class="form-control" 
                    .value="${this.targetHour}"
                    @input="${(e: Event) => {
                      const input = e.target as HTMLInputElement;
                      this.targetHour = input.value || "0";
                    if (this.isCheckedStart) { this.reload(); }
                    }}"
                    aria-label="" min="0" max="23" step="1" aria-describedby="targetHour">
                  </div>

                  <div class="input-group input-group-sm mb-3 me-2" style="width: 90px;">
                    <span class="input-group-text" id="targetMin">мин</span>
                    <input type="number" class="form-control" 
                    .value="${this.targetMin}"
                    @input="${(e: Event) => {
                      const input = e.target as HTMLInputElement;
                      this.targetMin = input.value || "0";
                    if (this.isCheckedStart) { this.reload(); }
                    }}"                     
                    aria-label="" min="0" max="59" step="1" aria-describedby="targetMin">
                  </div>

                  <div class="input-group input-group-sm mb-3 me-3" style="width: 90px;">
                    <span class="input-group-text" id="targetSec">сек</span>
                    <input type="number" class="form-control" 
                    .value="${this.targetSec}"
                    @input="${(e: Event) => {
                      const input = e.target as HTMLInputElement;
                      this.targetSec = input.value || "0";
                    if (this.isCheckedStart) { this.reload(); }
                    }}" 
                    aria-label="" min="0" max="59" step="1" aria-describedby="targetSec">
                  </div>

                  <div class="input-group input-group-sm mb-3 me-2" style="width: 110px;">
                    <span class="input-group-text" id="lambda">&lambda;:</span>
                    <input type="number" class="form-control" title="Значение радиуса колеса в мм. Корректировка скорости." 
                    .value="${this.lambda.toString()}"
                    @input="${(e: Event) => {
                    const input = e.target as HTMLInputElement;
                    const value = (+input.value || WheelConstants.REAL_RADIUS_MM);
                    this.lambda = ((value <= 100000) && (value >= 30000)) ? value : WheelConstants.REAL_RADIUS_MM;
                    if (this.isCheckedStart) { this.reload(); }
                  }}"
                  min="30000" max="100000" step="10" aria-describedby="lambda">
                  </div>

                <div class="me-4">
                  <p>${this.isCheckedStart ? html`В <b>${this.targetHour}ч.</b> <b>${this.targetMin}м.</b> <b>${this.targetSec}сек.</b>` 
                     : nothing} кабина №1 будет в позиции: 
                    <span class="fw-bold"> ~${'' + this.targetAngle.toFixed(2)}°</span>
                  </p>
                </div>
                
                <div class="d-flex flex-wrap gap-2 justify-content-start">
                  ${this._templateCalcOtherDegsCabin()}
                </div>

                </div>
                
              </div>
            </div>

              
          </div>
        </div>
      </div>
    </div>
     
    `
  }

  // SVG колеса обозрения
  private _svgWheel(): SVGTemplateResult {
      return svg `
      <svg  xmlns="http://www.w3.org/2000/svg" id="wheel" width="100%" style="height: auto; max-height: 900px;" viewBox="0 0 400 500" preserveAspectRatio="xMidYMin meet" xmlns:bx="https://boxy-svg.com">
        <g id="wheel-group">
          <ellipse id="wheel-ellipse" style="stroke: rgb(200, 200, 200); vector-effect: non-scaling-stroke; stroke-width: 0.5px; fill: rgb(246, 246, 246);" cx="200" cy="200" rx="180" ry="180"></ellipse>
          <text id="angle-value" style="fill: rgb(18, 8, 247); font-family: Consolas; font-size: 14px; line-height: 20px; stroke-width: 0.662554px; white-space: pre;" 
          transform="matrix(1.848762, 0, 0, 1.169858, -172.596316, -226.051181)" x="180" y="340">${this.degangle.toFixed(2)}°</text>
          <polygon style="vector-effect: non-scaling-stroke; stroke-width: 0.5px; stroke: rgb(141, 141, 141); fill: url(#pattern-0-0);" points="159.826 390.284 240 390 240 400 160 400"></polygon>
          <rect id="cabin0" x="192" y="380" width="16" height="16" style="stroke: rgb(0, 0, 0); fill: rgb(175, 47, 212); rx: 4; ry: 4;"></rect>
        </g>
        
        <defs>
          <bx:grid x="0" y="0" width="10" height="10" divisions="1"></bx:grid>
          <pattern x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse" viewBox="0 0 7 100" id="pattern-0">
            <rect width="2.983" height="100" style="fill: rgb(208, 208, 208);"></rect>
          </pattern>
          <pattern id="pattern-0-0" href="#pattern-0" patternTransform="matrix(1, 0, 0, 1, 187.413002, 382.5)"></pattern>
        </defs>

      </svg>
      `;  
  }

/**
 * Поиск угла положения кабины по заданному времени
 */
private _findCabinPosition() {
  
  const startTime = Date.now();
  const startAngle = this.degangle;
  
  const animate_find = () => {
      const targetTime = this._getTargetTime();
      if (!targetTime) {
          this._stopFindCabin();
          return;
      }
      
      const currentTime = Date.now();
      const elapsed = (currentTime - startTime) / 1000;
      const timeLeftToTarget = (targetTime.getTime() - currentTime) / 1000;
      const currentSpeed = parseFloat(this.speedWheel);
      
      // Рассчитываем угловую скорость на основе текущей скорости
      const angularSpeedDegPerSec = (currentSpeed / this.lambda) * (180 / Math.PI);
      
      // Текущий угол (на основе начального + усредненная скорость)
      // Это приблизительный расчет, так как скорость могла меняться
      const avgSpeed = (parseFloat(this.speedWheel) + currentSpeed) / 2;
      const avgAngularSpeed = (avgSpeed / this.lambda) * (180 / Math.PI);
      const currentAngle = startAngle + (avgAngularSpeed * elapsed);
      
      // Прогнозируемый угол на момент цели
      let targetAngle = currentAngle + (angularSpeedDegPerSec * timeLeftToTarget);
      
      // Нормализуем угол
      targetAngle = ((targetAngle % 360) + 360) % 360;
      
      this.targetAngle = targetAngle;

      this._highlightRaysForCabin(this.targetAngle);
      
      if (timeLeftToTarget <= 0.1) { // Добавляем небольшую погрешность
          console.log('Целевое время достигнуто');
          this._stopFindCabin();
          return;
      }      
      
      this.rafFindAngleCabin = requestAnimationFrame(animate_find);
    };
    
    animate_find();
}


/**
 * Создать объект времени по введенным знач. времени
 * @returns 
 */
private _getTargetTime(): Date | null {
    const hour = +this.targetHour;
    const minute = +this.targetMin;
    const second = +this.targetSec;
    
    if (isNaN(hour) || hour < 0 || hour > 23 ||
        isNaN(minute) || minute < 0 || minute > 59 ||
        isNaN(second) || second < 0 || second > 59) {
        return null;
    }
    
    const now = new Date();
    const target = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
        second,
        0
    );
    
    if (target <= now)
        target.setDate(target.getDate() + 1);
    
    return target;
}

/**
 * Вычисление углов остальных кабин относительно первой
 */
private calculateOtherDegsCabins() {
  this.degsCabin.length = 0;
  let angle = this.targetAngle;
  const otherCanins: Array<string> = [];
  for (let i = 2; i !== 31; ++i) {
    angle += 12;
    angle = ((angle % 360) + 360) % 360;
    otherCanins.push(`кабина ${i}:${angle.toFixed(2)}°`);
  }
  this.degsCabin = [...otherCanins];
}

/**
 * Рендеринг списка углов остальных кабин
 */
private _templateCalcOtherDegsCabin(): HTMLTemplateResult {
  return html `
    ${this.degsCabin.map((cabin) => {
      const [cab, angle] = cabin.split(':');
      return html `
        <div class="d-flex align-items-center me-2">
          <span class="badge text-bg-light me-2 fw-light">${cab}</span>
          <span class="fw-light">${angle}</span>
        </div>
      `;
    })}
  `;
}


/**
 * Функция получения угла из текущих координат
 */
private getCurrentCabinAngle(): number {
  const bbox = this.cabin0.getBBox();
  // Координаты центра элемента
  const centerX = this.wheelEllipse.cx.baseVal.value;
  const centerY = this.wheelEllipse.cy.baseVal.value;
  // Координаты центра кабины
  const cabinX = bbox.x + bbox.width / 2;
  const cabinY = bbox.y + bbox.height / 2;
  // Вычисляем стандартный угол (0° справа)
  let angleRad = Math.atan2(cabinY - centerY, cabinX - centerX);
  const clockwise = true; // Направление вращения (всегда против ч.с)
  if (clockwise) {
    // Для по часовой стрелке
    angleRad = 2 * Math.PI - angleRad; // Инвертируем
    angleRad += Math.PI / 2;           // Смещаем 0° внизу
  } else {
    // Для против часовой стрелки
    angleRad -= Math.PI / 2;           // Смещаем 0° внизу
  }
  // Конвертируем в градусы
  let angleDeg = angleRad * (180 / Math.PI);
  // Нормализация в [0, 360)
  angleDeg = ((angleDeg % 360) + 360) % 360;
  
  return angleDeg;
}


  /**
   * Запуск анимации вращения колеса (кабины)
   */
  private start() {
    this.startTimeDate = new Date();
    this.startTime = this.startTimeDate.toLocaleTimeString();
    this._turn();
    this._findCabinPosition();
    this.calculateOtherDegsCabins();
    this.stopTime = "--:--:--";
    this.diffTime = "";
  }


  /**
   * Останов анимации вращения кабины
   */
  private stop() {
    this.stopTimeDate = new Date();
    this.stopTime = this.stopTimeDate.toLocaleTimeString(); 
    this._stopFindCabin();
    this._stopCabin();
    const {hour, min, sec} = diffTime(this.startTimeDate, this.stopTimeDate);
    this.diffTime = `${hour}:${min}:${sec}`;  
  }

  /**
   * Перезапуск анимации
   */
  private reload() {
    this.stop();
    this.start();
  }


  /**
   * Обработчик переключателя запуска/остановки вращения
   * @param event 
   */
  private _toggleStart(event: Event) {
    const input = event.target as HTMLInputElement;
    this.isCheckedStart = input.checked;
    if (this.isCheckedStart) {
      this.start();
    } else {
      this.stop();
    }
  }


  /**
   * Задание координат кабины по углу
   */
  private _setCabinPositionByAngle() {
    const centerX = this.wheelEllipse.cx.baseVal.value;
    const centerY = this.wheelEllipse.cy.baseVal.value;
    const radius = this.wheelEllipse.rx.baseVal.value + this.cabin0.getBBox().height / 2;
    const angleRad = ((parseFloat(this.currentAngleCabin1) || 0) - 90) * (Math.PI / 180); // Преобразуем угол в радианы и смещаем на 90°
    this.angle = -angleRad; // Обновляем текущий угол
    const cx = centerX + radius * Math.cos(-angleRad) - this.cabin0.getBBox().width / 2;
    const cy = centerY + radius * Math.sin(-angleRad) - this.cabin0.getBBox().height / 2;
    this.cabin0.setAttribute('x', cx.toString());
    this.cabin0.setAttribute('y', cy.toString());
    
  }


  /**
   * Функция расчетов для анимации вращения кабины
   */
  private _turn() {
    const bbox = this.cabin0.getBBox();
    // Координаты центра элемента
    const centerX = this.wheelEllipse.cx.baseVal.value;
    const centerY = this.wheelEllipse.cy.baseVal.value;
    // Ширина и высота элемента
    const width = bbox.width;
    const height = bbox.height;
    const radius = this.wheelEllipse.rx.baseVal.value + height / 2;
    this.angle = bbox.y >= centerY ? Math.acos((bbox.x + width / 2 - centerX) / radius) : 2 * Math.PI - Math.acos((bbox.x + width / 2 - centerX) / radius);
   
    let lastTime = performance.now();

      const animate = () => {
      
      const currentTime = performance.now();
      const deltaTime = (currentTime - lastTime) / 1000; // В секундах
      lastTime = currentTime;

      const angularSpeedRadPerSec = parseFloat(this.speedWheel) / this.lambda;
       
      const angularSpeedPerFrame = angularSpeedRadPerSec * deltaTime;
      this.angle -= angularSpeedPerFrame;
      const radian = this.angle;

      this.degangle = this.getCurrentCabinAngle();
      
      const cx = centerX + radius * Math.cos(radian) - width / 2;
      const cy = centerY + radius * Math.sin(radian) - height / 2;
      this.cabin0.setAttribute('x', cx.toString());
      this.cabin0.setAttribute('y', cy.toString());

      this.cabins.forEach((cabin, index) => {
            // Угловое смещение между кабинами (12°)
            const angleBetweenCabins = (2 * Math.PI) / this.cabins.length;
            let cabinAngle = this.angle + (-index * angleBetweenCabins);
            cabinAngle -= angularSpeedPerFrame;
            const cx = centerX + radius * Math.cos(cabinAngle) - width / 2;
            const cy = centerY + radius * Math.sin(cabinAngle) - height / 2;
            cabin.setAttribute('x', cx.toString());
            cabin.setAttribute('y', cy.toString());
            
            const text = this.wheelGroup.querySelector(`#cabin-text-${index + 1}`);
            if (text) {
                const textCenterX = cx + width / 2;
                const textCenterY = cy + height / 2;
                text.setAttribute('x', textCenterX.toString());
                text.setAttribute('y', textCenterY.toString());
            }
        });
      this.rafWheelId = requestAnimationFrame(animate);
    };

    animate();
  }


  /**
   * Остановка вращения
   */ 
  private _stopCabin() {
    if (this.rafWheelId !== null) {
      cancelAnimationFrame(this.rafWheelId);
      this.rafWheelId = null;
    }
  }


  /**
   * Остановка цикла расчетов угла по заданному времени
   */
  private _stopFindCabin() {
    if (this.rafFindAngleCabin !== null) {
      cancelAnimationFrame(this.rafFindAngleCabin);
      this.rafFindAngleCabin = null;
    }
  }


  /**
   * Обновление текущего времени каждую секунду
   */
  private updateClock() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString();
    this.currentDate = now.toLocaleDateString();
    setTimeout(() => this.updateClock(), 1000);
  }


  private _getDiffTime(): string {
    if (this.diffTime) {
      const listT = this.diffTime.split(':');
      if (listT.length === 3) {
        const [h, m, s] = listT;
        return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
      }
    }
    return '--:--:--'
  }


  /**
   * Отрисовка лучей колеса обозрения 
   */
  private _printRay(): void {
    const centerX = this.wheelEllipse.cx.baseVal.value;
    const centerY = this.wheelEllipse.cy.baseVal.value;
    const radius = this.wheelEllipse.rx.baseVal.value;
    const lineLength = 180;

    const r1 = createCircleSVG('18', '200');
    this.wheelGroup.appendChild(r1);
    const r2 = createCircleSVG('90', '200');
    this.wheelGroup.appendChild(r2);
    const r3 = createCircleSVG('160', '200');
    this.wheelGroup.appendChild(r3);
    
    const baseLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    baseLine.setAttribute('x1', centerX.toString());
    baseLine.setAttribute('y1', (centerY - radius).toString());
    baseLine.setAttribute('x2', centerX.toString());
    baseLine.setAttribute('y2', (centerY - radius + lineLength).toString());
    baseLine.setAttribute('stroke', 'rgb(235, 235, 235)');
    baseLine.setAttribute('stroke-width', '0.5');
  
    const range = 36;
    const step = 10;

    for (let i = 0; i < range; i++) {
        const angle = i * step;
        const textAngle = (360 - (angle - 270)) % 360;
        const line = baseLine.cloneNode(true) as SVGLineElement;
        const id = `ray-${angle}`;
        line.setAttribute("id", id);
        line.setAttribute('data-angle', angle.toString());
        this.rays.set(angle, line);
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const rotationAngle = angle - 90;
        const txt = this._createAngleText(centerX, centerY, lineLength, textAngle);
        g.setAttribute('transform', `rotate(${rotationAngle} ${centerX} ${centerY})`);
        g.appendChild(line);
        g.appendChild(txt);
        this.wheelGroup.appendChild(g);
    }
}


/**
 * Создать кабины (29 остальные)
 */
private _createCabins(): void {
    const centerX = this.wheelEllipse.cx.baseVal.value;
    const centerY = this.wheelEllipse.cy.baseVal.value;
    const radius = this.wheelEllipse.rx.baseVal.value;
    
    // Очищаем существующие кабины (кроме первой)
    this.cabins.forEach(cabin => {
        if (cabin !== this.cabin0 && cabin.parentNode) {
            cabin.parentNode.removeChild(cabin);
        }
    });
    this.cabins = [this.cabin0]; // Начинаем с первой кабины
    const cabinsCount = 30; // Всего 30 кабин (1 уже есть + 29 новых)
    const cabinWidth = 16;
    const cabinHeight = 16;
    const cabinRadius = radius + cabinHeight / 2; 
    
    // 29 дополнительных кабин
    for (let i = 1; i < cabinsCount; i++) {
        const angleDeg = -i * (360 / cabinsCount);
        const angle = (angleDeg + 90) * (Math.PI / 180);
        // координаты кабины
        const cabinX = centerX + cabinRadius * Math.cos(angle) - cabinWidth / 2;
        const cabinY = centerY + cabinRadius * Math.sin(angle) - cabinHeight / 2;
        
        const cabin = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        cabin.setAttribute('id', `cabin${(+i) + 1}`);
        cabin.setAttribute('x', cabinX.toString());
        cabin.setAttribute('y', cabinY.toString());
        cabin.setAttribute('width', cabinWidth.toString());
        cabin.setAttribute('height', cabinHeight.toString());
        cabin.setAttribute('rx', '4');
        cabin.setAttribute('ry', '4');
        cabin.setAttribute('style', 'stroke: rgb(200, 200, 200); fill: rgb(240, 240, 240);');

        const centerCabinX = cabinX + cabinWidth / 2;
        const centerCabinY = cabinY + cabinHeight / 2;

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('id', `cabin-text-${i+1}`);

        text.setAttribute('x', centerCabinX.toString());
        text.setAttribute('y', centerCabinY.toString());
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('dominant-baseline', 'middle');
        text.setAttribute('font-size', '8');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#FFFFFF');
        text.setAttribute('pointer-events', 'none');
        text.setAttribute('filter', 'url(#text-shadow)');
        text.setAttribute('fill', '#3498db');
        const textNode = document.createTextNode((i + 1).toString());
        text.appendChild(textNode);
        
        this.wheelGroup.appendChild(cabin);
        this.wheelGroup.appendChild(text);
        this.cabins.push(cabin);
    }
}


/**
 * Создает текстовую подпись угла в группу луча
 */
private _createAngleText(
    centerX: number, 
    centerY: number, 
    lineLength: number, 
    angle: number, 
): SVGTextElement {
    const x = centerX.toString();
    const y = (centerY - lineLength + 30).toString();
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', x);
    text.setAttribute('y', y);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('data-angle', angle.toString());
    text.setAttribute('fill', '#3498db');
    text.setAttribute('font-size', '8');
    const textNode = document.createTextNode(`${angle}°`);
    text.appendChild(textNode);
    let textRotation = angle + 180;
    
    text.setAttribute('transform', `rotate(${textRotation} ${x} ${y})`);

    return text;
}


  /**
   * Подсветка лучей колеса, где будет находиться кабина в заданное время
   * @param angleDeg 
   * @returns 
   */
  private _highlightRaysForCabin(angleDeg: number): void {
    // Сбрасываем цвет всех лучей
    this._resetRayColors();
    if (this.rays.size === 0) return;
    const cabinAngleInRaySystem = (angleDeg + 90) % 360;
    
    // Нормализуем угол + реверс зн. угла для нормализации системы координат: 0 град внизу
    const normalizedAngle = ((-cabinAngleInRaySystem % 360) + 360) % 360;
    // Находим два ближайших луча
    const rayAngles = Array.from(this.rays.keys()).sort((a, b) => a - b);
    // Добавляем 360° для циклического поиска
    const extendedAngles = [...rayAngles, ...rayAngles.map(a => a + 360)];
    // Находим индекс первого луча с углом >= normalizedAngle
    const nextIndex = extendedAngles.findIndex(rayAngle => rayAngle >= normalizedAngle);
    
    if (nextIndex === -1) return;
    
    // Предыдущий и следующий лучи
    const nextRayAngle = extendedAngles[nextIndex];
    const prevRayAngle = extendedAngles[nextIndex > 0 ? nextIndex - 1 : rayAngles.length - 1];
    
    // Нормализуем углы обратно к [0, 360)
    const prevAngleNormalized = prevRayAngle % 360;
    const nextAngleNormalized = nextRayAngle % 360;
    
    // Получаем элементы лучей
    const prevRay = this.rays.get(prevAngleNormalized);
    const nextRay = this.rays.get(nextAngleNormalized);
    
    // Подсвечиваем лучи
    if (prevRay && nextRay) {
        prevRay.setAttribute('stroke', 'rgba(5, 153, 33, 0.37)');
        prevRay.setAttribute('stroke-width', '1.5');
        prevRay.setAttribute('stroke-opacity', '0.8');
        
        nextRay.setAttribute('stroke', 'rgba(5, 153, 33, 0.37)');
        nextRay.setAttribute('stroke-width', '1.5');
        nextRay.setAttribute('stroke-opacity', '0.8');        
    }
}

/**
 * Сброс цвета всех лучей
 */
private _resetRayColors(): void {
    this.rays.forEach(ray => {
        ray.setAttribute('stroke', 'rgb(235, 235, 235)');
        ray.setAttribute('stroke-width', '0.5');
        ray.setAttribute('stroke-opacity', '1');
    });
}


}


/**
 * Регистрация html тега <sun-speed></sun-speed>
 */
declare global {
  interface HTMLElementTagNameMap {
    'sun-speed': SunSpeed
  }
}
