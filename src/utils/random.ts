/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

export const genRandomImage = ({width=300, height=240}: {
  width?: number
  height?: number
}): string => `https://picsum.photos/${width}/${height}`
