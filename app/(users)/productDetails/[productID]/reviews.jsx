import { getReviews } from "@/lib/actions/reviewActions"
import RatingStar from "@/components/ratingStar"
import { dateFormat } from "@/lib/format"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
export default async function Reviews({ productID }) {
  const reviews = await getReviews(productID)
  // console.log(reviews)
  return (
    <div className="grid grid-cols-1 gap-4 my-8">
      {!reviews.error && (
        reviews.reviews.map((review) => (
          <div key={review._id} className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={review?.image} />
                <AvatarFallback className="bg-neutral-600 text-white">SC</AvatarFallback>
              </Avatar>
              <div>
                <p>{review.name}</p>
                <p>{review.email}</p>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex gap-4">
                <RatingStar rating={review.rating} />
                <span>{dateFormat(review.createdAt)}</span>
              </div>
              <p>{review.comment}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
