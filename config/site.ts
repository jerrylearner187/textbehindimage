export type SiteConfig = typeof siteConfig
import { msg, t } from '@lingui/macro'

export const siteConfig = {
  name: t`Text Behind Image`,
  slogan: '',
  showLogin: false,
  domain: "text-behind-image.net",
  url: 'https://text-behind-image.net',
  r2BaseUrl: 'https://s3.text-behind-image.net',
  icon: '/favicon.ico',
  email: 'support@text-behind-image.net'
}

export const tdkConfig = {
  title: t`Text Behind Image - Add Hidden Text to Your Images`,
  description: t`Transform your images with hidden text using our Text Behind Image tool. Perfect for watermarking, steganography, and creative design. Try it free today!`
}

export const heroConfig = {
  "title": t`Unlock Hidden Stories: Text Behind Image Made Effortless`,
  "description": t`Transform your images with hidden text using our Text Behind Image tool. Perfect for watermarking, steganography, and creative design. Try it free today!`
}

export const howtoConfig = {
  "title": t`How To Play Golf Orbit?`,
  "steps": [
    {
      "step": 1,
      "img": "https://img.golforbit.org/launch-the-game.png",
      "instruction": t`Launch the Game`,
      "description": t`Start by entering Golf Orbit, where you will embark on an exciting golfing adventure. Familiarize yourself with the game interface and controls.`
    },
    {
      "step": 2,
      "img": "https://img.golforbit.org/understand-the-objective.png",
      "instruction": t`Understand the Objective`,
      "description": t`Your main goal in Golf Orbit is to hit the golf ball as far as possible while navigating through various obstacles like rocks and sand pits.`
    },
    {
      "step": 3,
      "img": "https://img.golforbit.org/control-the-ball.png",
      "instruction": t`Control the Ball`,
      "description": t`Use a simple click-and-hold mechanism to set your shot's power. Tap and hold the left mouse button to adjust the strength, then release to launch the ball.`
    },
    {
      "step": 4,
      "img": "https://img.golforbit.org/aim-for-the-green-area.png",
      "instruction": t`Aim for the Green Area`,
      "description": t`Stop the navigation bar in the range closest to the green area to ensure the best hitting direction for maximum distance.`
    },
    {
      "step": 5,
      "img": "https://img.golforbit.org/monitor-your-shots.png",
      "instruction": t`Monitor Your Shots`,
      "description": t`Each shot will record the distance traveled. Keep track of your progress to improve your skills and aim for longer distances with each swing.`
    },
    {
      "step": 6,
      "img": "https://img.golforbit.org/collect-coins-and-rewards.png",
      "instruction": t`Collect Coins and Rewards`,
      "description": t`During your flight, collect coins to unlock upgrades. The longer the distance you achieve, the more points you earn, which can be used to enhance your gameplay.`
    },
    {
      "step": 7,
      "img": "https://img.golforbit.org/utilize-upgrade-strategically.png",
      "instruction": t`Utilize Upgrades Strategically`,
      "description": t`Use your accumulated points to boost your shot's strength, speed, and bounce. Experiment with different combinations for optimal performance.`
    },
    {
      "step": 8,
      "img": "https://img.golforbit.org/visit-the-golf-orbit-clubhouse.png",
      "instruction": t`Visit the Golf Orbit Clubhouse`,
      "description": t`Exchange points at the clubhouse to change your golfer, ball color, or even the world you play in. Choose from a variety of fun characters and vibrant locations.`
    },
    {
      "step": 9,
      "img": "https://img.golforbit.org/pratice-and-experiment.png",
      "instruction": t`Practice and Experiment`,
      "description": t`Keep playing Golf Orbit to master the challenges and learn how to overcome obstacles effectively. The more you play, the better you'll become!`
    }
  ]
}

export const tipConfig = {
  "title": t`Tips Of Playing Golf Orbit`,
  "tips": [
    {
      "img": "FaBrain",
      "tip": t`Focus on Timing`,
      "description": t`Perfect your timing when clicking to hit the ball. The right timing can significantly increase your shot distance.`
    },
    {
      "img": "FaRobot",
      "tip": t`Experiment with Upgrades`,
      "description": t`Try different upgrades to see which combinations yield the best results for your play style.`
    },
    {
      "img": "FaMicrochip",
      "tip": t`Observe Obstacles`,
      "description": t`Learn the layout of obstacles in each level. Understanding their positions can help you strategize your shots better.`
    },
    {
      "img": "FaLaptop",
      "tip": t`Engage in One-Shot Battles`,
      "description": t`Participate in one-shot battles to challenge yourself and improve your skills in a competitive environment.`
    },
    {
      "img": "FaSatelliteDish",
      "tip": t`Have Fun with Customization`,
      "description": t`Enjoy the unique character and ball customization options. Playing as different characters can add a fun twist to your gameplay.`
    }
  ]
}

export const faqConfig = [
  {
    "question": t`What is Golf Orbit?`,
    "answer": t`Golf Orbit is an exciting golf simulator game where players aim to launch golf balls to incredible heights, even reaching Mars. It features one-shot golf battles, challenging levels, and the opportunity to master the perfect shot.`
  },
  {
    "question": t`How do I play Golf Orbit?`,
    "answer": t`To play Golf Orbit, you need to hit the ball as far as possible while navigating through hilly fields filled with obstacles. Understanding ball direction and utilizing upgrades effectively are key to achieving high scores.`
  },
  {
    "question": t`What are the main objectives in Golf Orbit?`,
    "answer": t`The main objectives include hitting the ball as far as you can, scoring by landing the ball in holes with flags, and strategically using power-ups to enhance your performance.`
  },
  {
    "question": t`How can I improve my score in Golf Orbit?`,
    "answer": t`You can improve your score by practicing consistently, learning from each shot, and using accumulated scores to purchase power-ups that enhance your throws.`
  },
  {
    "question": t`Are there any challenges in Golf Orbit?`,
    "answer": t`Yes, Golf Orbit presents unpredictable situations and obstacles that require technique and perseverance. Players must adapt their strategies to overcome these challenges.`
  },
  {
    "question": t`Can anyone play Golf Orbit?`,
    "answer": t`Absolutely! Golf Orbit is designed with simple goals and easy-to-understand rules, making it accessible for players of all skill levels.`
  }
]

export const gameList = [
  {
    "id": 1,
    "title": msg`Golf Orbit`,
    "href": "/",
    "imageUrl": "https://golf-orbit.io/cache/data/image/game/golf-obit-logo-f160x160.webp"
  },
  {
    "id": 2,
    "title": msg`Cave Golf`,
    "href": "/cave-golf",
    "imageUrl": "https://golf-orbit.io/cache/data/image/game/cave-golf-f160x160.webp"
  }
  ,
  {
    "id": 3,
    "title": msg`Golf Field`,
    "href": "/golf-field",
    "imageUrl": "https://golf-orbit.io/cache/data/image/game/golf-field-f160x160.webp"
  },
  {
    "id": 4,
    "title": msg`Golf Battle`,
    "href": "/golf-battle",
    "imageUrl": "https://golf-orbit.io/cache/data/image/game/golf-battle-f160x160.webp"
  } ,
  {
    "id": 5,
    "title": msg`Mini Golf Game 3D`,
    "href": "/mini-golf-game-3d",
    "imageUrl": "	https://golf-orbit.io/cache/data/image/game/mini-golf-game-3d-f160x160.webp"
  }
]