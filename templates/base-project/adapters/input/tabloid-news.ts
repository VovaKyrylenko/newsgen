import { InputAdapter, NewsItem } from '../../types'

export const tabloidNewsInput: InputAdapter = {
  name: 'tabloid-news',
  async run(): Promise<NewsItem[]> {
    return [
      {
        title:
          'EXCLUSIVE: Man Discovers Secret Button Under His Desk — What Happens Next Will Shock You!',
        content:
          'In a twist nobody saw coming, the mysterious red button under the desk launched a full-scale investigation into office politics. Eyewitnesses claim “it changed everything.”',
      },
      {
        title:
          'BREAKING: Local Woman Eats 5 Burgers in 3 Minutes — Is This the End of Portion Control?',
        content:
          'Witnesses were left stunned as the feast unfolded. Experts are baffled. Doctors warn: “Portion size will never be the same.”',
      },
      {
        title: 'ALIENS? Experts Can’t Explain These Noises from Your Basement',
        content:
          'Scientists are scrambling for answers as a suburban home becomes ground zero for unidentified rumbling. “It’s either a poltergeist or worse,” one neighbor muttered.',
      },
    ]
  },
}
