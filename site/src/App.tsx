import { Cuer } from 'cuer'
import { useEffect, useState } from 'react'
import { createCssVariablesTheme, createHighlighter } from 'shiki'

const demos = [
  {
    code: `<Cuer value="https://cuer.dev" />`,
    preview: <Cuer value="https://cuer.dev" />,
    title: 'Basic',
  },
  {
    code: `<Cuer\n\tarena="/wevm.svg"\n\tvalue="https://cuer.dev"\n/>`,
    preview: (
      <Cuer
        arena={
          <svg
            width="4px"
            height="4px"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Wevm</title>
            <path
              d="M23.3522 104.727C22.3733 94.3302 21.2312 84.4109 19.926 74.969C18.7295 65.421 17.533 56.1382 16.3366 47.1207C16.0102 44.8928 15.5208 43.5136 14.8682 42.9832C14.2155 42.3467 13.3998 42.0284 12.4208 42.0284C10.3542 42.0284 7.79812 43.885 4.75256 47.5981L1 43.3015C5.45957 37.3605 9.70159 32.8517 13.7261 29.7751C17.7506 26.6986 21.7751 25.1603 25.7995 25.1603C30.0416 25.1603 33.1959 26.3803 35.2625 28.8203C37.3292 31.2604 38.6344 35.0265 39.1782 40.1188C39.9396 46.4841 40.5922 53.1677 41.1361 60.1696C41.6799 67.1715 42.1694 74.1733 42.6045 81.1752C47.0641 72.7942 51.4692 64.254 55.82 55.5547C60.2796 46.8554 64.6304 37.944 68.8724 28.8203H83.0669C83.6108 32.3213 84.1546 36.5118 84.6985 41.3919C85.2423 46.1659 85.7862 51.2581 86.33 56.6687C86.9826 61.9731 87.5809 67.1715 88.1247 72.2637C88.6686 77.356 89.2124 81.9709 89.7563 86.1083C93.4544 81.2282 96.8807 76.4012 100.035 71.6272C103.189 66.8532 106.289 61.814 109.335 56.5095L107.377 50.9399C106.616 48.8181 105.854 46.6433 105.093 44.4154C104.331 42.1875 103.951 40.0658 103.951 38.0501C103.951 33.4882 105.31 30.1464 108.03 28.0247C110.749 25.7968 114.012 24.6829 117.819 24.6829C119.342 24.6829 120.756 24.9481 122.061 25.4785C123.366 25.9029 124.399 26.3803 125.161 26.9107C126.031 28.1838 126.629 29.5099 126.956 30.8891C127.282 32.2682 127.445 34.1778 127.445 36.6179C127.445 38.9518 126.956 41.551 125.977 44.4154C125.106 47.2798 123.257 51.2581 120.429 56.3504C116.405 63.4584 111.13 71.2559 104.603 79.743C98.1859 88.124 90.8983 96.452 82.7406 104.727L70.8303 106L69.1987 104.727C68.6549 100.696 68.0567 96.0276 67.404 90.7232C66.7514 85.3127 66.0988 79.9021 65.4462 74.4916C64.7936 68.975 64.1409 64.0418 63.4883 59.6922C59.7901 66.8002 55.7657 74.2794 51.4149 82.13C47.1728 89.9806 42.822 97.5129 38.3625 104.727L25.1469 106L23.3522 104.727Z"
              fill="currentColor"
            />
          </svg>
        }
        value="https://cuer.dev"
      />
    ),
    title: 'Basic (Arena)',
  },
  {
    code: `<Cuer.Root value="https://cuer.dev">
  <Cuer.Cells radius={0} inset={false} />
  <Cuer.Finder radius={0} />
  <Cuer.Arena>
    <img
      src="https://img.decrypt.co/insecure/rs:..."
      style={{
        height: '100%',
        objectFit: 'cover',
        width: '100%',
      }}
    />
  </Cuer.Arena>
</Cuer.Root>`,
    preview: (
      <Cuer.Root value="https://cuer.dev">
        <Cuer.Cells radius={0} inset={false} />
        <Cuer.Finder radius={0} />
        <Cuer.Arena>
          <img
            alt="Arena"
            src="https://img.decrypt.co/insecure/rs:fit:2048:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2019/04/vitalik-head-gID_7.jpeg@webp"
            style={{
              height: '100%',
              objectFit: 'cover',
              width: '100%',
            }}
          />
        </Cuer.Arena>
      </Cuer.Root>
    ),
    title: 'Advanced (No Radii, No Inset)',
  },
  {
    code: `<Cuer.Root value="https://cuer.dev">
  <Cuer.Cells />
  <Cuer.Finder radius={1} />
  <Cuer.Arena>
    <img
      src="https://img.decrypt.co/insecure/rs:..."
      style={{
        borderRadius: '100%',
        height: '100%',
        objectFit: 'cover',
        width: '100%',
      }}
    />
  </Cuer.Arena>
</Cuer.Root>`,
    preview: (
      <Cuer.Root value="https://cuer.dev">
        <Cuer.Cells />
        <Cuer.Finder radius={1} />
        <Cuer.Arena>
          <img
            alt="Arena"
            src="https://img.decrypt.co/insecure/rs:fit:2048:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2019/04/vitalik-head-gID_7.jpeg@webp"
            style={{
              borderRadius: '100%',
              height: '100%',
              objectFit: 'cover',
              width: '100%',
            }}
          />
        </Cuer.Arena>
      </Cuer.Root>
    ),
    title: 'Advanced (Circular Finder)',
  },
]
const pkgi = ['npm i', 'pnpm i', 'yarn add']

const theme = createCssVariablesTheme({
  name: 'cuer',
  variablePrefix: '--shiki-',
  variableDefaults: {},
})

export function App() {
  const [copied, setCopied] = useState(false)
  const [i, setI] = useState(0)

  const [demo, setDemo] = useState(0)
  const [html, setHtml] = useState('')
  useEffect(() => {
    createHighlighter({
      langs: ['javascript'],
      themes: [theme],
    }).then(({ codeToHtml }) =>
      setHtml(
        codeToHtml('import { Cuer } from "cuer"\n\n' + demos[demo].code, {
          lang: 'javascript',
          defaultColor: false,
          theme: 'cuer',
        }),
      ),
    )
  }, [demo])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')
        setDemo((demo) => (demo + demos.length - 1) % demos.length)
      if (e.key === 'ArrowRight') setDemo((demo) => (demo + 1) % demos.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="relative flex flex-col items-center justify-center pb-10">
      <div className="absolute top-0 max-sm:top-0 -z-1">
        <div className="relative overflow-hidden">
          <Cuer.Root
            errorCorrection="high"
            size="600px"
            value="abcabasdasdnjakjdnaksdnasjnkdnjasdkasnasdnasjdnajskdnajksndajksdnajksdnajksdnajksndajksndjaksndajskndajksndajksndjaksdnjkansdjkasndjkansdjkasndjkasdnasjkdnakjsndkjasndjkasndjkasndjknasdjkasndjkasndjkasndsdjgbsdfhgbdfhjgbdfhjgbjdksajksandjaksnsdjndsandjkaskdnasndjkasndnasjdnanskdnjasjdnkajsndjkasdjkasnd"
          >
            <Cuer.Finder radius={1} />
            <Cuer.Cells />
          </Cuer.Root>
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-radial-[at_50%_50%] dark:from-black/40 dark:to-black from-white/50 to-white to-97%" />
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-linear-to-b dark:from-black/40 dark:to-black from-white/50 to-white to-50%" />
        </div>
      </div>

      <div className="h-15 max-sm:h-15" />

      <h1 className="text-4xl font-semibold">cuer</h1>

      <div className="h-2" />

      <p className="text-md tracking-wide">Opinionated QR Code for React</p>

      <div className="h-4" />

      <div className="flex items-center gap-2 h-[34px]">
        <pre className="relative bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-md py-1 px-3 pr-8">
          <code className="flex items-center gap-2">
            <button
              className="px-[6px] -mx-[6px] rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors"
              onClick={() => setI((i) => (i + 1) % pkgi.length)}
              type="button"
            >
              {pkgi[i]}
            </button>
            <div>cuer</div>
          </code>
          <button
            className="absolute p-1 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-900 hover:text-black dark:hover:text-white transition-colors right-1 top-1/2 -translate-y-1/2"
            onClick={() => {
              navigator.clipboard.writeText(pkgi[i] + ' cuer')
              setCopied(true)
              setTimeout(() => setCopied(false), 1000)
            }}
            type="button"
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <title>Check</title>
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 6L9 17l-5-5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <title>Copy</title>
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </g>
              </svg>
            )}
          </button>
        </pre>
        <a
          href="https://github.com/wevm/cuer"
          className="flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#121213] hover:text-black dark:hover:text-white transition-colors rounded-md py-1 px-2 h-full"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <title>GitHub</title>
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </g>
          </svg>
        </a>
      </div>

      <div className="h-10" />

      <div className="relative flex flex-col max-w-xl w-full border bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 rounded-md">
        <p className="absolute left-4 top-4 text-xs text-zinc-400 dark:text-zinc-500">
          {demos[demo].title}
        </p>
        <div className="flex items-center justify-between py-10 px-4">
          <button
            className="size-10 rounded-full text-lg text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-colors flex items-center justify-center"
            type="button"
            onClick={() =>
              setDemo((demo) => (demo + demos.length - 1) % demos.length)
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <title>Previous</title>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m12 19l-7-7l7-7m7 7H5"
              />
            </svg>
          </button>
          <div className="size-40">{demos[demo].preview}</div>
          <button
            className="size-10 rounded-full text-lg text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 transition-colors flex items-center justify-center"
            type="button"
            onClick={() => setDemo((demo) => (demo + 1) % demos.length)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <title>Next</title>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h14m-7-7l7 7l-7 7"
              />
            </svg>
          </button>
        </div>

        <hr className="w-full border-zinc-100 dark:border-zinc-900" />

        <div
          className="flex-1 p-4 overflow-x-scroll"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <div className="h-8" />

      <a
        className="flex items-center gap-[6px]"
        href="https://wevm.dev"
        target="_blank"
        rel="noreferrer"
      >
        <span>By</span>
        <svg
          className="h-3"
          width="60px"
          height="100%"
          viewBox="0 0 311 63"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
        >
          <title>wevm</title>
          <path
            d="M17.24 61.12C16.52 53.28 15.68 45.8 14.72 38.68C13.84 31.48 12.96 24.48 12.08 17.68C11.84 16 11.48 14.96 11 14.56C10.52 14.08 9.91999 13.84 9.19999 13.84C7.67999 13.84 5.79999 15.24 3.55999 18.04L0.799988 14.8C4.07999 10.32 7.19999 6.92 10.16 4.6C13.12 2.28 16.08 1.12 19.04 1.12C22.16 1.12 24.48 2.04 26 3.88C27.52 5.72 28.48 8.56 28.88 12.4C29.44 17.2 29.92 22.24 30.32 27.52C30.72 32.8 31.08 38.08 31.4 43.36C34.68 37.04 37.92 30.6 41.12 24.04C44.4 17.48 47.6 10.76 50.72 3.88H61.16C61.56 6.52 61.96 9.68 62.36 13.36C62.76 16.96 63.16 20.8 63.56 24.88C64.04 28.88 64.48 32.8 64.88 36.64C65.28 40.48 65.68 43.96 66.08 47.08C68.8 43.4 71.32 39.76 73.64 36.16C75.96 32.56 78.24 28.76 80.48 24.76L79.04 20.56C78.48 18.96 77.92 17.32 77.36 15.64C76.8 13.96 76.52 12.36 76.52 10.84C76.52 7.4 77.52 4.88 79.52 3.27999C81.52 1.59999 83.92 0.759995 86.72 0.759995C87.84 0.759995 88.88 0.959996 89.84 1.36C90.8 1.68 91.56 2.03999 92.12 2.43999C92.76 3.4 93.2 4.4 93.44 5.43999C93.68 6.48 93.8 7.92 93.8 9.76C93.8 11.52 93.44 13.48 92.72 15.64C92.08 17.8 90.72 20.8 88.64 24.64C85.68 30 81.8 35.88 77 42.28C72.28 48.6 66.92 54.88 60.92 61.12L52.16 62.08L50.96 61.12C50.56 58.08 50.12 54.56 49.64 50.56C49.16 46.48 48.68 42.4 48.2 38.32C47.72 34.16 47.24 30.44 46.76 27.16C44.04 32.52 41.08 38.16 37.88 44.08C34.76 50 31.56 55.68 28.28 61.12L18.56 62.08L17.24 61.12Z"
            fill="currentColor"
          />
          <path
            d="M125.84 7.71999C124.16 7.71999 122.36 8.43999 120.44 9.88C118.6 11.24 116.84 13.16 115.16 15.64C113.48 18.12 112.04 20.96 110.84 24.16C109.72 27.36 109.08 30.72 108.92 34.24C114.36 32.32 118.64 30.2 121.76 27.88C124.88 25.48 127.08 23.04 128.36 20.56C129.64 18.08 130.28 15.76 130.28 13.6C130.28 11.6 129.84 10.12 128.96 9.16C128.08 8.2 127.04 7.71999 125.84 7.71999ZM113 62.8C106.76 62.8 101.68 60.8 97.76 56.8C93.92 52.8 92 47.28 92 40.24C92 35.04 92.88 30.12 94.64 25.48C96.48 20.76 99 16.6 102.2 13C105.4 9.32 109.16 6.44 113.48 4.35999C117.8 2.2 122.48 1.12 127.52 1.12C132.96 1.12 137.08 2.32 139.88 4.72C142.76 7.12 144.2 10.24 144.2 14.08C144.2 19.12 141.32 23.84 135.56 28.24C129.88 32.56 121.08 36.2 109.16 39.16C109.56 43 110.8 45.84 112.88 47.68C114.96 49.52 117.64 50.44 120.92 50.44C124.44 50.44 127.56 49.56 130.28 47.8C133 46.04 135.28 44 137.12 41.68L140.48 44.08C138.88 47.12 136.72 50.08 134 52.96C131.36 55.84 128.28 58.2 124.76 60.04C121.24 61.88 117.32 62.8 113 62.8Z"
            fill="currentColor"
          />
          <path
            d="M164.24 61.12C163.44 53.28 162.6 45.84 161.72 38.8C160.92 31.68 160.04 24.68 159.08 17.8C158.84 16.04 158.44 14.96 157.88 14.56C157.4 14.08 156.84 13.84 156.2 13.84C155.48 13.84 154.64 14.16 153.68 14.8C152.8 15.44 151.76 16.52 150.56 18.04L147.8 14.8C151.08 10.32 154.2 6.92 157.16 4.6C160.12 2.28 163.12 1.12 166.16 1.12C169.2 1.12 171.48 2.08 173 4C174.52 5.91999 175.52 8.84 176 12.76C176.64 18.36 177.2 24.16 177.68 30.16C178.16 36.08 178.6 42.04 179 48.04C184.84 40.44 190 32.56 194.48 24.4L193.28 20.44C192.72 18.84 192.16 17.24 191.6 15.64C191.12 13.96 190.88 12.36 190.88 10.84C190.88 7.4 191.8 4.88 193.64 3.27999C195.56 1.59999 197.96 0.759995 200.84 0.759995C201.96 0.759995 203 0.959996 203.96 1.36C205 1.68 205.8 2.03999 206.36 2.43999C207 3.4 207.44 4.4 207.68 5.43999C207.92 6.48 208.04 7.92 208.04 9.76C208.04 11.44 207.72 13.36 207.08 15.52C206.44 17.68 205.04 20.72 202.88 24.64C199.92 29.92 195.92 35.8 190.88 42.28C185.84 48.68 180.24 54.96 174.08 61.12L165.44 62.08L164.24 61.12Z"
            fill="currentColor"
          />
          <path
            d="M228.4 61L212.8 61.96L211.12 60.52L220.96 13.6L212.56 12.28L213.4 7.84L237.88 0.999999L240.16 2.92L238.12 13.48C242.12 9.64 246.16 6.64 250.24 4.48C254.4 2.24 258.32 1.12 262 1.12C264.64 1.12 266.84 1.96 268.6 3.64C270.36 5.32 271.24 7.84 271.24 11.2C271.24 11.6 271.24 12.04 271.24 12.52C271.24 12.92 271.2 13.32 271.12 13.72C275.12 9.71999 279.16 6.64 283.24 4.48C287.4 2.24 291.32 1.12 295 1.12C297.56 1.12 299.72 1.96 301.48 3.64C303.24 5.32 304.12 7.84 304.12 11.2C304.12 12.8 303.96 14.48 303.64 16.24C303.4 18 303.04 19.8 302.56 21.64L296.92 44.32C296.6 45.44 296.32 46.44 296.08 47.32C295.92 48.12 295.84 48.84 295.84 49.48C295.84 51.08 296.48 51.88 297.76 51.88C299.76 51.88 302.72 49.4 306.64 44.44L310.24 46.84C308.64 49.56 306.68 52.16 304.36 54.64C302.12 57.04 299.52 59 296.56 60.52C293.68 62.04 290.48 62.8 286.96 62.8C284.16 62.8 281.96 62.16 280.36 60.88C278.84 59.52 278.08 57.64 278.08 55.24C278.08 53.4 278.28 51.52 278.68 49.6C279.16 47.68 279.64 45.84 280.12 44.08L284.56 26.08C285.04 24.24 285.4 22.56 285.64 21.04C285.96 19.44 286.12 18.16 286.12 17.2C286.12 15.84 285.8 14.88 285.16 14.32C284.6 13.76 283.88 13.48 283 13.48C281.32 13.48 279.36 14.04 277.12 15.16C274.96 16.28 272.56 18.04 269.92 20.44L266.8 35.32C265.92 39.56 265.04 43.84 264.16 48.16C263.36 52.4 262.56 56.68 261.76 61L246.16 61.96L244.48 60.52L251.92 24.76C252.32 23.16 252.64 21.72 252.88 20.44C253.12 19.08 253.24 17.92 253.24 16.96C253.24 15.76 252.92 14.88 252.28 14.32C251.72 13.76 251 13.48 250.12 13.48C248.36 13.48 246.36 14.04 244.12 15.16C241.88 16.28 239.4 18 236.68 20.32L233.44 35.32C232.56 39.56 231.72 43.84 230.92 48.16C230.12 52.4 229.28 56.68 228.4 61Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  )
}
