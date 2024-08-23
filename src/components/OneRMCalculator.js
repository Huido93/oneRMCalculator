import React, { useState } from 'react';
import { useTranslation } from './../il8n.js';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

const formulas = [
  {
    name: 'Epley Formula',
    description: '1RM = Weight × (1 + Reps / 30)',
    details: 'The Epley formula is one of the most commonly used methods for calculating 1RM. It is simple and effective for a wide range of rep ranges, especially for lower reps. It works best for those performing fewer than 10 reps. [Source: Functional Strength Lab]',
    bestFor: 'General strength training, particularly when performing fewer reps per set.',
    details_ko: '에플리 공식은 1RM 계산에 가장 일반적으로 사용되는 방법 중 하나입니다. 간단하고, 특히 적은 반복 수에 대해 효과적입니다. 10회 미만의 반복 수행에 가장 적합합니다. [출처: Functional Strength Lab]',
    bestFor_ko: '적은 반복 횟수에 적합하며, 일반적인 훈련에 사용하기 적합합니다.',
    calculate: (weight, reps) => weight * (1 + reps / 30),
  },
  {
    name: 'Brzycki Formula',
    description: '1RM = Weight × (36 / (37 - Reps))',
    details: 'The Brzycki formula provides a slightly more conservative estimate of 1RM. It is commonly used by beginners and intermediate lifters who are lifting in the 6-10 rep range.',
    bestFor: 'Beginners and intermediate lifters; useful for a moderate range of reps.',
    details_ko: '브지키 공식은 약간 더 보수적인 1RM 추정치를 제공합니다. 6-10회 반복 범위에서 리프팅하는 초보자와 중급자들에게 일반적으로 사용됩니다.',
    bestFor_ko: '초보자와 중급 리프터에게 적합하며, 중간 정도의 반복 범위에 유용합니다.',
    calculate: (weight, reps) => weight * (36 / (37 - reps)),
  },
  {
    name: 'Lander Formula',
    description: '1RM = (100 × Weight) / (101.3 - 2.67123 × Reps)',
    details: 'The Lander formula adjusts the weight lifted based on a non-linear relationship between reps and 1RM. This makes it more accurate for those who work within a higher rep range.',
    bestFor: 'Experienced lifters working within higher rep ranges.',
    details_ko: '랜더 공식은 반복 횟수와 1RM 사이의 비선형 관계에 기반하여 들어올린 무게를 조정합니다. 이는 더 높은 반복 범위에서 운동하는 사람들에게 더 정확합니다.',
    bestFor_ko: '고급 리프터들이 더 높은 반복 범위 내에서 작업할 때 적합합니다.',
    calculate: (weight, reps) => (100 * weight) / (101.3 - 2.67123 * reps),
  },
  {
    name: 'Lombardi Formula',
    description: '1RM = Weight × Reps^0.10',
    details: 'The Lombardi formula uses a power law relationship between reps and 1RM, providing lower estimates for endurance athletes. It’s particularly useful for those performing higher reps. ',
    bestFor: 'Endurance athletes or those performing higher rep ranges.',
    details_ko: '롬바르디 공식은 반복 횟수와 1RM 사이에 지수 관계를 사용하여 내구성 운동선수에게 더 낮은 추정치를 제공합니다. 특히 높은 반복 수를 수행하는 사람들에게 유용합니다.',
    bestFor_ko: '내구성 운동선수 또는 더 높은 반복 범위를 수행하는 사람들에게 적합합니다.',
    calculate: (weight, reps) => weight * Math.pow(reps, 0.10),
  },
  {
    name: 'Mayhew et al. Formula',
    description: '1RM = (100 × Weight) / (52.2 + 41.9 × e^(-0.055 × Reps))',
    details: 'The Mayhew formula includes an exponential component, making it more accurate across a broader spectrum of rep ranges, particularly for advanced lifters.',
    bestFor: 'Advanced lifters working across a broad spectrum of rep ranges.',
    details_ko: '메이휴 공식은 지수 성분을 포함하여, 특히 고급 리프터에게 더 넓은 반복 범위에서 더 정확합니다.',
    bestFor_ko: '광범위한 반복 범위에서 작업하는 고급 리프터에게 적합합니다.',
    calculate: (weight, reps) => (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps)),
  },
  {
    name: "O'Conner Formula",
    description: '1RM = Weight × (1 + 0.025 × Reps)',
    details: 'The O’Conner formula is conservative, often used by athletes to ensure safety while estimating 1RM. It is similar to the Epley formula but with a smaller coefficient for reps.',
    bestFor: 'Athletes seeking a conservative estimate, especially in sports settings.',
    details_ko: "오코너 공식은 보수적이며, 1RM 추정 시 안전을 보장하기 위해 운동선수들에 의해 자주 사용됩니다. 에플리 공식과 유사하지만 반복 횟수에 대한 계수가 더 작습니다.",
    bestFor_ko: '보수적인 추정을 원하는 운동선수들에게 적합합니다, 특히 스포츠 환경에서 활용됩니다.',
    calculate: (weight, reps) => weight * (1 + 0.025 * reps),
  },
  {
    name: 'Wathan Formula',
    description: '1RM = (100 × Weight) / (48.8 + 53.8 × e^(-0.075 × Reps))',
    details: 'The Wathan formula is accurate for those performing moderate reps (6-10), as it incorporates an exponential factor to provide a balanced 1RM estimate. ',
    bestFor: 'Intermediate to advanced lifters who perform moderate reps.',
    details_ko: '와탄 공식은 지수 요소를 포함하여 중간 정도의 반복(6-10회)을 수행하는 사람들에게 정확한 1RM 추정치를 제공합니다.',
    bestFor_ko: '중급에서 고급 리프터들에게 적합하며, 중간 정도의 반복 횟수에서 정확합니다.',
    calculate: (weight, reps) => (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps)),
  },
];

const OneRMCalculator = () => {
  const { t, toggleLanguage, language } = useTranslation();
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [selectedFormulaIndex, setSelectedFormulaIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps, 10);

    if (isNaN(weightNum) || weightNum <= 0) {
      setError(t('errorWeight'));
      setResult(null);
      return;
    }

    if (isNaN(repsNum) || repsNum <= 0 || repsNum > 30) {
      setError(t('errorReps'));
      setResult(null);
      return;
    }

    setError('');
    const formula = formulas[selectedFormulaIndex];
    const oneRM = formula.calculate(weightNum, repsNum);
    setResult(oneRM.toFixed(2));
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="flex-grow-1 text-center">
          <h1 className="mb-0">{t('title')}</h1>
        </div>
        <Form.Check 
          type="switch"
          id="languageSwitch"
          label={language === 'en' ? 'English' : '한국어'}
          className="form-check-lg"
          onChange={toggleLanguage}
          checked={language === 'ko'}
        />
      </div>
      <div className="p-3 mb-4 bg-light rounded">
        {/* <p>{t('intro')}</p> */}
        {t('intro').split('\n').map((line, index) => (
          <p key={index}>{line.trim()}</p>
        ))}
      </div>
      <Form.Group className="mb-3">
        <Form.Label><strong>{t('selectFormula')}</strong></Form.Label>
        <Form.Select
          value={selectedFormulaIndex}
          onChange={(e) => setSelectedFormulaIndex(e.target.value)}
        >
          {formulas.map((formula, index) => (
            <option key={index} value={index}>
              {formula.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div className="p-3 mb-4 bg-light rounded">
        <h4>{t('formulaInfo')}</h4>
        <p>{language === 'en' ? formulas[selectedFormulaIndex].details : formulas[selectedFormulaIndex].details_ko}</p>
        <p><strong>{t('bestFor')}:</strong> {language === 'en' ? formulas[selectedFormulaIndex].bestFor : formulas[selectedFormulaIndex].bestFor_ko}</p>
      </div>
      <Row>
        <Col md={6} >
          <Form.Group className="mb-3">
            <Form.Label><strong>{t('weight')}</strong></Form.Label>
            <Form.Control
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
              step="any"
            />
          </Form.Group>
        </Col>
        <Col md={6} >
          <Form.Group className="mb-3">
            <Form.Label><strong>{t('reps')}</strong></Form.Label>
            <Form.Control
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              min="1"
              max="30"
            />
          </Form.Group>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      {result && (
        <Alert variant="success" className="mt-4">
          <h4>{t('estimated1RM')}: {result} kg/lbs</h4>
        </Alert>
      )}
      <Button onClick={handleCalculate} className="btn-lg w-100" variant="primary">
        {t('calculate')}
      </Button>
    </Container>
  );
};

export default OneRMCalculator;