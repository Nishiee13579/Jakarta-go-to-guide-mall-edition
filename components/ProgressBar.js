import styles from './ProgressBar.module.css'

export default function ProgressBar({ current, total }) {
  const pct = Math.round(((current + 1) / total) * 100)
  return (
    <div className={styles.wrap}>
      <div className={styles.fill} style={{ width: `${pct}%` }} />
    </div>
  )
}
