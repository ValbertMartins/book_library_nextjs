export function getPublicIdFromUrl(photoUrl: string) {
  const photoUrlArrayReverse = photoUrl.split("").reverse()

  const indexLast = photoUrlArrayReverse.findIndex(element => element == "/")

  const indexInitial = photoUrlArrayReverse.findIndex(element => element == ".")

  const publicId = photoUrlArrayReverse
    .slice(indexInitial + 1, indexLast)
    .reverse()
    .join("")

  return publicId
}
