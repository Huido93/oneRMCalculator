import { useState } from 'react';

export const useTranslation = () => {
  const [language, setLanguage] = useState('ko');

  const translations = {
    en: {
      title: "1RM Calculator",
      intro: `One-repetition maximum (one-rep max or 1RM) in weight training is the maximum amount of weight that a person can lift for one repetition. \n
              Weight training protocols often use 1RM when programming to ensure the exerciser reaches resistance overload, particularly when the exercise objective is muscular strength, endurance, or hypertrophy.\n
              While 1RM can be measured directly using trial and error testing, where the participant lifts progressively heavier free weights, it can also be estimated indirectly using repetition testing on submaximal loads.\n
              Compared to a formal 1RM test, the submaximal estimation method is safer and quicker. It is recommended to use a value of less than 10 reps for more accurate estimations.\n
              Choose one of the formulas below and calculate your estimated 1RM!`,
      weight: "Weight Lifted (kg or lbs):",
      reps: "Number of Reps:",
      selectFormula: "Select Formula:",
      formulaInfo: "Formula Information:",
      calculate: "Calculate 1RM",
      estimated1RM: "Estimated 1RM",
      errorWeight: "Please enter a valid weight greater than 0.",
      errorReps: "Please enter a valid number of reps (1-30).",
      toggleLanguage: "Toggle Language",
      bestFor: "Best For",
    },
    ko: {
      title: "1RM 계산기",
      intro: `웨이트 트레이닝에서 1RM은 한 번의 '반복'에서 들어 올릴 수 있는 최대 무게를 의미하며, 운동 프로그램을 계획하는데 자주 사용됩니다.\n
              1RM은 점차적으로 더 무거운 중량을 들어 올려 실패 지점에 도달하는 직접적인 방법으로도 측정할 수 있지만, 각종 공식을 통하여 최대 하중을 간접적으로 추정할 수도 있습니다.\n
              직접적인 1RM 측정에 비해 이와 같은 방법은 더 안전하고 편리하여 많이 사용됩니다. 보다 정확한 추정을 위해서는 10회 미만의 반복 값을 사용하는 것을 권장합니다.\n 
              아래의 공식 중 하나를 선택하여 예상 1RM을 계산하십시오!`,
      weight: "들어올린 무게 (kg 또는 lbs):",
      reps: "반복 횟수:",
      selectFormula: "공식 선택:",
      formulaInfo: "공식 정보:",
      calculate: "1RM 계산",
      estimated1RM: "예상 1RM",
      errorWeight: "0보다 큰 유효한 무게를 입력하십시오.",
      errorReps: "1-30 사이의 유효한 반복 횟수를 입력하십시오.",
      toggleLanguage: "언어 전환",
      bestFor: "적합한 용도",
    }
  };

  const t = (key) => translations[language][key];
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ko' : 'en');

  return { t, toggleLanguage, language };
};