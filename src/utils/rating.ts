import type { Rating, Sight } from '@/types/sight.types'

export const calcRatingScore = (ratings: Rating[], k = 0.1) => {
  if (Array.isArray(ratings)) {
    const V = ratings.length
    const R = V > 0 ? ratings.reduce((sum, rating) => sum + rating.value, 0) / V : 0
    const S = R * (1 - Math.exp(-k * V))
    return S.toFixed(1)
  }

  return '0'
}

export const compareNum = (a: Sight, b: Sight) => {
  return Number(calcRatingScore(b.rating)) - Number(calcRatingScore(a.rating))
}
