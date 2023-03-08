import { Header } from "./components/Header";
import { Post, PostProps } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

import "./styles.css";

import Styles from "./App.module.css";

const posts: PostProps[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/kelvinsilvadev.png",
      name: "Kelvin Oliveira",
      role: "Front-end Dev",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2023-03-06"),
  },
  {
    id: 2,
    author: {
      avatarUrl:
        "https://media.licdn.com/dms/image/D4D03AQEDjREs6nC84A/profile-displayphoto-shrink_800_800/0/1672459169667?e=2147483647&v=beta&t=YlV1ZJU-Qxf0U4dIZ_ldFhwbBkyH6S900GpW61YWmHc",
      name: "Kelvin Silva",
      role: "Software Engineer",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀",
      },
      { type: "link", content: "jane.design/doctorcare" },
    ],
    publishedAt: new Date("2023-03-05"),
  },
];

function App() {
  return (
    <div>
      <Header />
      <div className={Styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return <Post key={post.id} post={post} />;
          })}
        </main>
      </div>
    </div>
  );
}

export default App;
