import Joi from 'joi'
import { BaseYamlService } from '../index.js'
import { renderVersionBadge } from '../version.js'

const schema = Joi.string().required()

export default class SdkmanVersion extends BaseYamlService {
  static category = 'version'

  static route = { base: 'sdkman', pattern: ':sdk' }

  static defaultBadgeData = { label: 'SDKMAN!', color: 'blue' }

  static render({ version }) {
    return renderVersionBadge({ version })
  }

  async fetch({ sdk }) {
    return this._requestYaml({
      schema,
      url: `https://api.sdkman.io/2/candidates/default/${sdk}`,
      errorMessages: {
        400: 'candidate not found',
      },
    })
  }

  async handle({ sdk }) {
    const version = await this.fetch({ sdk })
    return this.constructor.render({ version })
  }
}
