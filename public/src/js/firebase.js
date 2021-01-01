
  var firebaseConfig = {
    apiKey: "AIzaSyAwViZXMFIxSBhYX3yWBqg1NkNG6wzucVc",
    authDomain: "appostme.firebaseapp.com",
    projectId: "appostme",
    storageBucket: "appostme.appspot.com",
    messagingSenderId: "921000809930",
    appId: "1:921000809930:web:442971b32e9cfb4bf36b33",
    measurementId: "G-7QLTBGHEND"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  //Configurar dayjs
  dayjs.extend(window.dayjs_plugin_relativeTime);
  const locale = {
      name:'es',
      monthsShort: 'ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic'.split('_'),
      weekdays: 'domingo_lunes_martes_miercoles_jueves_viernes_sabado'.split('_'),
      weekdaysShort: 'dom._lun._mar._mie._jue._vie._sab.'.split('_'),
      weekdaysMin: 'do_lu_ma_mi_ju_vi_sa'.split('_'),
      months: 'Enero_Febrero_marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_octubre_noviembre_Diciembre'.split('_'),
      weekStart:1,
      fromats: {
          LT:'H:mm',
          LTS:'H:mm:ss',
          L:'DD/MM/YYYY',
          LL:'D [de] MMMM [de] YYYY',
          LLL:'D [de] MMMM [de] YYYY H:mm',
          LLL:'dddd, D [de] MMMM [de] YYYY H:mm'
      },
      relativeTime:{
          future: 'en %s',
          past: 'hace %s',
          s: 'unos segundos',
          m: 'un minuto',
          mm: '%d minutos',
          h: 'una hora',
          hh: '%d horas',
          d: 'un día',
          dd: '%d días',
          M: 'un mes',
          MM: '%d meses',
          y: 'un año',
          yy: '%d años'
      },
      ordinal: (n) => `${n}°`
  };
  dayjs.locale(locale, null, true);
  dayjs.locale('es');
