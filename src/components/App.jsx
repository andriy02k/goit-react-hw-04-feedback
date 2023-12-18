import React, { useState } from 'react'
import FeedbackOptions from './FeedbackOptions/FeedbackOptions'
import Statistics from './Statistics/Statistics'
import Section from './Section/Section'
import Notification from './Notification/Notification'

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateFeedback = (feedbackType) => {
      switch (feedbackType) {
        case 'good':
          setGood((prevGood) => prevGood + 1);
          break;
        case 'neutral':
          setNeutral((prevNeutral) => prevNeutral + 1);
          break;
        case 'bad':
          setBad((prevBad) => prevBad + 1);
          break;
        default:
      }
  }
  
  const calculateTotal = () => {
    return good + neutral + bad;
  }
  
  const calculatePercent = () => {
        return calculateTotal() > 0 ? Math.round((good / calculateTotal()) * 100) : 0;
  }

  const conditionRender = calculateTotal() > 0;

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={updateFeedback}
        />
      </Section>
      <Section title="Statistics">
        {conditionRender ? (
          <Statistics
            neutral={neutral}
            good={good}
            bad={bad}
            total={calculateTotal()}
            goodPersent={calculatePercent()}
          />
        ) : (
          <Notification message="There is no feedback"/>
        )}
      </Section>
    </>
  )
}

