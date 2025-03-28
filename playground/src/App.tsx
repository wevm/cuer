import { Cuer } from 'cuer'

export function App() {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <Cuer errorCorrection="low" size="20vh" value="https://wevm.dev" />

      <Cuer
        arena="https://img.decrypt.co/insecure/rs:fit:2048:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2019/04/vitalik-head-gID_7.jpeg@webp"
        size="20vh"
        value="https://wevm.dev"
      />

      <Cuer
        arena={
          <svg
            width="100%"
            height="100%"
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
        size="20vh"
        value="https://wevm.dev"
      />

      <Cuer.Root size="20vh" value="https://wevm.dev">
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

      <Cuer.Root size="20vh" value="https://wevm.dev">
        <Cuer.Cells />
        <Cuer.Finder radius={1} />
        <Cuer.Arena>
          <img
            alt="Arena"
            src="https://img.decrypt.co/insecure/rs:fit:2048:0:0:0/plain/https://cdn.decrypt.co/wp-content/uploads/2019/04/vitalik-head-gID_7.jpeg@webp"
            style={{
              borderRadius: 4,
              height: '100%',
              objectFit: 'cover',
              width: '100%',
            }}
          />
        </Cuer.Arena>
      </Cuer.Root>
    </div>
  )
}
