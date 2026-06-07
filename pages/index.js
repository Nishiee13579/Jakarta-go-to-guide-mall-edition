import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { questions } from '../data/questions'
import { scoreDestinations } from '../data/scoring'
import ProgressBar from '../components/ProgressBar'
import QuizCard from '../components/QuizCard'
import ResultCard from '../components/ResultCard'

const INITIAL_ANSWERS = {
  q1: [],
  q2: [],
  q3: [],
  q4: [],
  q5: [],
  q6: [],
  q7: [],
  q8: [],
}

export default function Home() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(INITIAL_ANSWERS)
  const [results, setResults] = useState(null)

  const totalSteps = questions.length
  const currentQ = questions[step]
  const currentAnswers = answers[currentQ?.id] || []

  function handleSelect(keys) {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: keys }))
  }

  function handleNext() {
    if (step < totalSteps - 1) {
      setStep((s) => s + 1)
    } else {
      // Convert arrays to single values for non-multi questions
      const normalized = {}
      questions.forEach((q) => {
        normalized[q.id] = q.multi ? answers[q.id] : answers[q.id][0]
      })
      const top2 = scoreDestinations(normalized)
      setResults(top2)
    }
  }

  function handleBack() {
    setStep((s) => s - 1)
  }

  function handleReset() {
    setStep(0)
    setAnswers(INITIAL_ANSWERS)
    setResults(null)
  }

  return (
    <>
      <Head>
        <title>Jakarta Destination Guide</title>
      </Head>
      <div className={styles.page}>
        <div className={styles.container}>

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.dot} />
            <span className={styles.brand}>Jakarta Destination Guide</span>
          </header>

          {/* Quiz mode */}
          {!results && (
            <>
              <ProgressBar current={step} total={totalSteps} />
              <QuizCard
                key={step}
                question={currentQ}
                selected={currentAnswers}
                onSelect={handleSelect}
                onNext={handleNext}
                onBack={step > 0 ? handleBack : null}
                isLast={step === totalSteps - 1}
              />
            </>
          )}

          {/* Result mode */}
          {results && (
            <div className={styles.results}>
              <div className={styles.resultsHeader}>
                <div className={styles.resultsLabel}>Rekomendasi Terbaik</div>
                <h1 className={styles.resultsTitle}>
                  Ini tempat yang<br />paling cocok buat kamu
                </h1>
                <p className={styles.resultsSub}>
                  Berdasarkan 8 preferensi yang kamu pilih
                </p>
              </div>

              {results.length > 0 ? (
                results.map((place, i) => (
                  <ResultCard key={place.id} place={place} rank={i + 1} />
                ))
              ) : (
                <div className={styles.noResult}>
                  <p>Hmm, tidak ada destinasi yang cocok dengan kombinasi pilihanmu.</p>
                  <p>Coba ubah area atau transportasi.</p>
                </div>
              )}

              <button className={styles.btnReset} onClick={handleReset}>
                ↺ Ulangi Kuis
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
