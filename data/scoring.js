import { destinations } from "./destinations"

export function scoreDestinations(answers) {
  const { q1, q2, q3, q4, q5, q6, q7, q8 } = answers
  const isRainyWeather = q3 === "B"

  const scored = destinations.map((d) => {
    let score = 0
    let maxScore = 0
    let eliminated = false
    const reasons = []

    // FILTER MUTLAK (40%) — area & transport must match
    const areaMatch = q2.some((a) => d.area.includes(a))
    const transportMatch = d.transport.includes(q4)

    if (!areaMatch || !transportMatch) {
      eliminated = true
      return { ...d, score: 0, matchRate: 0, eliminated: true, reasons: [] }
    }

    // CUACA (20%) — eliminate outdoor-only in rain
    if (isRainyWeather && d.outdoorOnly) {
      eliminated = true
      return { ...d, score: 0, matchRate: 0, eliminated: true, reasons: [] }
    }

    // Area match
    score += 15
    maxScore += 15

    // Transport match
    score += 15
    maxScore += 15

    // Budget match (20% weight)
    maxScore += 20
    if (d.budget.includes(q8)) {
      score += 20
      reasons.push("Budget cocok")
    } else if (q8 === "B" && d.budget.includes("C")) {
      score += 8
    }

    // Weather preference (10%)
    maxScore += 10
    if (!isRainyWeather) {
      score += 10
    } else if (d.indoor) {
      score += 10
      reasons.push("Indoor — aman dari hujan")
    }

    // Time preference (5%)
    maxScore += 5
    if (d.timePreference.includes(q5)) {
      score += 5
    }

    // Agenda match (15%)
    maxScore += 15
    const agendaMatches = q6.filter((a) => d.agenda.includes(a)).length
    const agendaScore = Math.round((agendaMatches / Math.max(q6.length, 1)) * 15)
    score += agendaScore
    if (agendaMatches > 0) reasons.push(`${agendaMatches} agenda cocok`)

    // Culinary match (10%)
    maxScore += 10
    if (d.culinary.includes(q7)) {
      score += 10
      reasons.push("Tipe kuliner sesuai")
    }

    // Companion match (5%)
    maxScore += 5
    if (d.companion.includes(q1)) {
      score += 5
    }

    // Vibe bonus (5%)
    maxScore += 5
    if (q5 === "B" && ["sangat_ramai", "estetik", "populer"].includes(d.vibe)) {
      score += 5
      reasons.push("Vibe sore-malam cocok")
    } else if (q5 === "A" && ["santai", "quiet"].includes(d.vibe)) {
      score += 5
    }

    const matchRate = Math.min(Math.round((score / maxScore) * 100), 99)

    return { ...d, score, matchRate, eliminated: false, reasons }
  })

  return scored
    .filter((d) => !d.eliminated)
    .sort((a, b) => b.matchRate - a.matchRate)
    .slice(0, 2)
}
