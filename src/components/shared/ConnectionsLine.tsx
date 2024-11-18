/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import { IconCirclePlus } from '@tabler/icons-react'
import React from 'react'

export const ConnectionsLine = ({connections, enableAdd}: {
  connections: string[]
  enableAdd?: boolean
}): JSX.Element => (
  <div className="px-5">
    <section className="text-primary font-medium">携手作品</section>
    <ul className="list-disc ">
      {connections.map((connection) => (
        <li key={connection} className="text-primary">{connection}</li>
              ))}
    </ul>
    {enableAdd && <IconCirclePlus className="text-primary"/>}
  </div>
)
