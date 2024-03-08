const songs = [
    // [
        { 
            name: "Gasoline",
            id: "6Q1m1GyNxyOwZ2ud3p7XoS" },
        { 
            name: "Hurricane",
            id: "2GFwwTIVLjnOrtP7m9luHC" 
        },
        { 
            name: "Blank Space",
            id: "2ZiJidFdQ30nVJEP4u44l3" 
        },
        { 
            name: "Bow Down",
            id: "5qD3Qv8Wu3r5uRD0DahcZy" 
        },
        { 
            name: "There's Fear In Letting Go",
            id: "2OYtcqflvzQwh3cMPmTHs4" 
        },
        { 
            name: "Self-Destruction",
            id: "4UhMvTR5tHf2ecfoz0KV92" 
        },
        { 
            name: "Scars",
            id: "6WaYiQUPel70HUaCZj5eND" 
        },
        { 
            name: "Bad Things",
            id: "3jTWNaSfBQvv3HPTqQjkkM" 
        },
        { 
            name: "Deep End",
            id: "27Nkg5NHILTJUcCyBkvVHt" 
        },
        { 
            name: "Paranoid",
            id: "7dENhnDxTHnzGtpMrsJ72w" 
        },
        { 
            name: "Come And Get It",
            id: "44M12pkcMqqdbNNooHCZ6C" 
        },
        { 
            name: "Feel Something (With I Prevail)",
            id: "5dAtKXyrQoQW054LZqJ5dP" 
        },
        { 
            name: "Body Bag",
            id: "650iZCPhzCPtSmynGnUnhT" 
        },
        { 
            name: "Every Time You Leave",
            id: "5icbZiF6lcuEORG0UzMsS2" 
        },
        { 
            name: "Let Me Be Sad",
            id: "5jmYu7XY4zd3mJfizA8t1K" 
        },
        { 
            name: "Breaking Down",
            id: "4bE3cBcwAe7T5SklvbkiYZ" 
        },
    // ],
    // [
        { 
            name: "Stuck In Your Head",
            id: "6T38YYdc9GkLO07TRI3li2" 
        },
        { 
            name: "Life Lines",
            id: "0ofLz0b9mmXXvDgQp7XPRd" 
        },
        { 
            name: "Closure",
            id: "5bnH51lYXOGVVjW7ABkKTW" 
        },
        { 
            name: "Rise Above It",
            id: "6QyBWey7P8ILuhS5RO7xYe" 
        },
        { 
            name: "Alone",
            id: "6c9xVWbPeVPgrmWTYYeMTr" 
        },
        { 
            name: "My Heart I Surrender",
            id: "4Qt5o43KerMzgh0PNPm6Q1" 
        },
        { 
            name: "Choke",
            id: "7jm63qwHLmemNcMzORjwfi" 
        },
        { 
            name: "FWYTYK",
            id: "0XX1yoKE6UQzweWOmgsIg2" 
        },
        { 
            name: "Deadweight",
            id: "7N1t3vT849WXqA4QA1IjoV" 
        },
        { 
            name: "Rise",
            id: "46QdfDL0LnGlHLKmREiXP5" 
        },
        { 
            name: "Fake",
            id: "0MBYfuf0BxZH1FJf6jHTus" 
        },
        { 
            name: "Visceral",
            id: "1ZJNyOtk0bdYbPi1zlyFj5" 
        },
        { 
            name: "DOA [Feat. Joyner Lucas]",
            id: "0rgw8WEzyACa3xLqdUeNTq" 
        },
        { 
            name: "Judgement Day",
            id: "7d1GHT3e3Y5HtX8TOqL5kD" 
        },
        { 
            name: "The Negative",
            id: "4FtWn9oF9YneHguKyz6YYJ" 
        },
        { 
            name: "DOA",
            id: "1mMcmRSdnLLu4UdQogH6zf" 
        },
    // ],
    // [
        { 
            name: "Low",
            id: "345k7youQ1IzZaijlTwhZf" 
        },
        { 
            name: "Long Live The King",
            id: "1cetZ53ybwRhTCi6N2KHTS" 
        },
        { 
            name: "Love, Lust, And Liars",
            id: "2KfdXkLFx4Zfzt4xG1RQGz" 
        },
        { 
            name: "I Don't Belong Here",
            id: "2JEuoW7VtugjY2XtxK034T" 
        },
        { 
            name: "Crossroads",
            id: "6sCGVAUwValfBkChJaFThx" 
        },
        { 
            name: "Doomed",
            id: "2X7QHaXlpec4VHTucG65N3" 
        },
        { 
            name: "Heart Vs Mind",
            id: "2BBwKogsgV6n2wxbC7MGFC" 
        },
        { 
            name: "Chaos",
            id: "1yryMsXAGBK79VOrGe1qEe" 
        },
        { 
            name: "Deep End - Stripped",
            id: "0S5h1Dk10b2UK2ssQE4AsO" 
        },
        { 
            name: "Deceivers",
            id: "7kbMPJRI4fQaXygxcGsv1R" 
        },
        { 
            name: "The Enemy",
            id: "5qjgV8n0pqmyq73wGbbizP" 
        },
        { 
            name: "Goodbye (Interlude)",
            id: "1cibLXzaDHSO7zZPdcc1GJ" 
        },
        { 
            name: "Worst Part Of Me",
            id: "4Cp2sF1lshGmQTqqi1YB5W" 
        },
        { 
            name: "Already Dead",
            id: "1PKrNYT7TsJVHsbpBYRwfJ" 
        },
        { 
            name: "One More Time",
            id: "3BAVKeHXjW1IvxyZkyTdVh" 
        },
        { 
            name: "Pull The Plug",
            id: "26T6okQX8PAjIkuE96dBR3" 
        },
    // ],
    // [
        {
            name: "Hurricane - Reimagined",
            id: "2Ocb4ZnUwbhZUsS622aj8y"
        },
        {
            name: "Outcast",
            id: "0ofLz0b9mmXXvDgQp7XPRd"
        },
        {
            name: "0:00",
            id: "09LVru8C41ElGYNaXmpzNT"
        },
        {
            name: "Every Time You Leave [Feat. Delaney Jane] - Live Acoustic",
            id: "0aaebNiuIPahYHRNdekEWh"
        },
        {
            name: "Face Your Demons",
            id: "58FQyH5jqb85CzURK0qxrV"
        },
        {
            name: "Bow Down - Live from Grand Rapids / 2019",
            id: "4QZEauXm6L9eCAvbc1fOVz"
        },
        {
            name: "Every Time You Leave [Feat. Delaney Jane] - Live on SiriusXM / 2020",
            id: "2yxGROY9yFXv35PcaHmOlj"
        },
        {
            name: "Deadweight [Feat. Caleb Shomo] - Live from Fayetteville / 2019",
            id: "5c0N6AiWJfkHkeQ2qqN7sQ"
        },
        {
            name: "Let Me Be Sad - Live from Rehearsal / 2020",
            id: "08Q0XsthZUu5mBSGb5xPDR"
        },
        {
            name: "Gasoline - Live from Download Australia / 2019",
            id: "3aVJdAt6j7YTHD6E0FCbP2"
        },
        {
            name: "Hurricane - Live from Vienna / 2020",
            id: "4KjGsYPDz6OiJmsyyGVTyW"
        },
        {
            name: "Deep End - Live from London / 2023",
            id: "42TXRtZRjiWNGjlTBgVWlJ"
        },
        {
            name: "Paranoid - Live from Rock am Ring / 2019",
            id: "1Fg8EsRdEwXBQKlyCApms9"
        },
        {
            name: "Rise Above It - Live from Montreal / 2019",
            id: "3ub7e994jBN5e2qH61PW5Z"
        },
        {
            name: "Breaking Down - Live from Detroit / 2019",
            id: "5ksLBvjHXI0H9w1Sl06zyN"
        },
        {
            name: "I Don’t Belong Here - Live from Rehearsal / 2020",
            id: "4QmfMgif6kDjrFAXlkNqQi"
        },
    // ]
]

export default songs