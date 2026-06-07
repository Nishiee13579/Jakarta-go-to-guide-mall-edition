import styles from './ResultCard.module.css'

export default function ResultCard({ place, rank }) {
  const isTop = rank === 1

  return (
    <div className={`${styles.card} ${isTop ? styles.top : ''}`}>
      <div className={styles.header}>
        <div className={styles.rankBadge}>
          {isTop ? '🥇 #1 Best Match' : '🥈 #2 Runner Up'}
        </div>
        <div className={styles.matchBadge}>{place.matchRate}% Match</div>
      </div>

      <h3 className={styles.name}>{place.name}</h3>
      <p className={styles.location}>📍 {place.location}</p>

      <div className={styles.tags}>
        {place.tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      {place.reasons.length > 0 && (
        <div className={styles.reasons}>
          {place.reasons.map((r, i) => (
            <div key={i} className={styles.reason}>
              <span className={styles.check}>✓</span>
              {r}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
