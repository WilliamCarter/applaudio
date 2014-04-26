package utils

object ConvertibleInt {
  implicit def intToConvertibleInt(x: Int) = new ConvertibleInt(x)
}

class ConvertibleInt(n: Int) {

  // Utility methods for simple conversion/arithmetic operations on integers.
  // When the below methods are called on integers, Scala implicitly converts them to ConvertibleInt using methods in the above companion object, before executing the original methods.

  val value = n

  def kilobytes: Int = n * 1024
  def megabytes: Int = kilobytes * 1024

}
