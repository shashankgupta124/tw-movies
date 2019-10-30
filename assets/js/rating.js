export function rating(rating) {

    const RATING = Math.round(rating / 2);

    return `<i class="fa ${RATING >= 1 ? 'fa-star' : 'fa-star-o'}"></i>
            <i class="fa ${RATING >= 2 ? 'fa-star' : 'fa-star-o'}"></i>
            <i class="fa ${RATING >= 3 ? 'fa-star' : 'fa-star-o'}"></i>
            <i class="fa ${RATING >= 4 ? 'fa-star' : 'fa-star-o'}"></i>
            <i class="fa ${RATING >= 5 ? 'fa-star' : 'fa-star-o'}"></i>`
}