import styles from "./card.module.css"

interface CardProperties{
  title: string,
  description: string
}

export default function Card( {title, description}:CardProperties ){
  return(
    <div className={styles.flipCard}>
        <div className={styles.flipCardInner}>
            <div className={styles.flipCardFront}>
                <h3 className="text-[20px]">{title}</h3>
            </div>
            <div className={styles.flipCardBack}>
                <p className="text-[16px]">{description}</p>
            </div>
        </div>
    </div>

  )
}