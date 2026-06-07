import styles from './QuizCard.module.css'

export default function QuizCard({ question, selected, onSelect, onNext, onBack, isLast }) {
  const { id, label, title, hint, multi, max, options } = question
  const hasSelection = selected.length > 0
  const atMax = max && selected.length >= max

  function handleSelect(key) {
    if (!multi) {
      onSelect([key])
      return
    }
    if (selected.includes(key)) {
      onSelect(selected.filter((k) => k !== key))
    } else {
      if (!atMax) onSelect([...selected, key])
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <h2 className={styles.title}>{title}</h2>
      {hint && <p className={styles.hint}>{hint}</p>}

      <div className={`${styles.grid} ${options.length <= 2 ? styles.gridTwo : ''}`}>
        {options.map((opt) => {
          const isSel = selected.includes(opt.key)
          const isDisabled = !isSel && atMax
          return (
            <button
              key={opt.key}
              className={`${styles.option} ${isSel ? styles.selected : ''} ${isDisabled ? styles.disabled : ''}`}
              onClick={() => handleSelect(opt.key)}
              disabled={isDisabled}
            >
              <span className={styles.key}>{opt.key}</span>
              <span className={styles.textWrap}>
                <span className={styles.optText}>{opt.text}</span>
                {opt.sub && <span className={styles.sub}>{opt.sub}</span>}
              </span>
            </button>
          )
        })}
      </div>

      <div className={styles.nav}>
        {onBack && (
          <button className={styles.btnBack} onClick={onBack}>
            ← Kembali
          </button>
        )}
        <button
          className={`${styles.btnNext} ${hasSelection ? styles.btnActive : ''}`}
          onClick={onNext}
          disabled={!hasSelection}
        >
          {isLast ? 'Lihat Rekomendasi →' : 'Lanjut →'}
        </button>
      </div>
    </div>
  )
}
