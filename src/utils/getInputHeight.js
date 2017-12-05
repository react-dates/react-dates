export default function getInputHeight({
  lineHeight,
  inputPadding,
  displayTextPaddingVertical,
}) {
  return parseInt(lineHeight, 10)
    + (2 * inputPadding)
    + (2 * displayTextPaddingVertical);
}
