export default function doDateRangesOverlap(firstStart, firstEnd, secondStart, secondEnd) {
  return (
    firstStart.isBefore(secondEnd) || firstStart.isSame(secondEnd)
  ) && (
    firstEnd.isAfter(secondStart) || firstEnd.isSame(secondStart)
  );
}

