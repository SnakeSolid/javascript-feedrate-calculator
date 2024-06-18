"use strict";

const application = Vue.createApp({
  created() {
    this.selectedUnit = this.units[0];
  },

  data() {
    return {
      units: [
        { name: "мм/мин", factor: 1.0 },
        { name: "мм/сек", factor: 1.0 / 60.0 },
      ],
      materials: [
        {
          name: "Мягкое дерево",
          depth: 1.5,
          d05: 0.02,
          d2: 0.035,
          d4: 0.055,
          d6: 0.09,
          d10: 0.12,
          comment: "Сосна, ель, ольха, кедр, липа, осина, каштан, тополь, ДВП, МДФ",
        },
        {
          name: "Жёсткое дерево",
          depth: 1.0,
          d05: 0.02,
          d2: 0.035,
          d4: 0.055,
          d6: 0.09,
          d10: 0.12,
          comment:
            "Дуб, бук, вишня, берёза, груша, яблоня, лиственница, карагач, вяз, палисандр, фанера",
        },
        {
          name: "Твёрдое дерево",
          depth: 0.6,
          d05: 0.02,
          d2: 0.035,
          d4: 0.055,
          d6: 0.09,
          d10: 0.12,
          comment: "Орех, ясень, венге, акация, клён, рябина, бамбук",
        },
        {
          name: "Очень твёрдое дерево",
          depth: 0.5,
          d05: 0.02,
          d2: 0.035,
          d4: 0.055,
          d6: 0.09,
          d10: 0.12,
          comment:
            "Грецкий орех, амарант, макассар, олива, ярра, сукупира, белая акация",
        },
        {
          name: "Пены",
          depth: 4.0,
          d05: 0.06,
          d2: 0.1,
          d4: 0.15,
          d6: 0.27,
          d10: 0.35,
          comment: "Пенопласт, пенополиуретан, пенополистирол",
        },
        {
          name: "Композиты и оргстекло",
          depth: 0.5,
          d05: 0.02,
          d2: 0.05,
          d4: 0.1,
          d6: 0.18,
          d10: 0.25,
        },
        {
          name: "Пластик",
          depth: 1.0,
          d05: 0.02,
          d2: 0.06,
          d4: 0.15,
          d6: 0.2,
          d10: 0.3,
        },
        {
          name: "Цветной металл",
          depth: 0.2,
          d05: 0.01,
          d2: 0.03,
          d4: 0.04,
          d6: 0.05,
          d10: 0.08,
          comment: "Алюминий, медь, серебро, золото",
        },
        {
          name: "Твёрдый цветной металл",
          depth: 0.15,
          d05: 0.01,
          d2: 0.02,
          d4: 0.03,
          d6: 0.04,
          d10: 0.07,
          comment: "Дюраль, латунь, бронза",
        },
        {
          name: "Черный металл",
          depth: 0.1,
          d05: 0.005,
          d2: 0.01,
          d4: 0.015,
          d6: 0.02,
          d10: 0.03,
        },
      ],
      selectedMaterial: null,
      selectedUnit: null,
      spindleSpeed: 12_000,
      cutterDiameter: 1,
      numberTeeth: 1,
    };
  },

  methods: {
    hasComment() {
      if (this.selectedMaterial !== null) {
        return this.selectedMaterial.comment !== undefined;
      } else {
        return false;
      }
    },

    feedrate() {
      if (this.selectedMaterial !== null) {
        const value =
          this.selectedUnit.factor *
          this.speedPerTeeth() *
          this.spindleSpeed *
          this.numberTeeth;

        return value.toFixed(2);
      } else {
        return "~";
      }
    },

    depth() {
      if (this.selectedMaterial !== null) {
        const value = this.cutterDiameter * this.selectedMaterial.depth;

        return value.toFixed(3);
      } else {
        return "~";
      }
    },

    speedPerTeeth() {
      if (this.cutterDiameter < 2.0) {
        return this.selectedMaterial.d05;
      } else if (this.cutterDiameter < 4.0) {
        return this.selectedMaterial.d2;
      } else if (this.cutterDiameter < 6.0) {
        return this.selectedMaterial.d4;
      } else if (this.cutterDiameter < 10.0) {
        return this.selectedMaterial.d6;
      } else {
        return this.selectedMaterial.d10;
      }
    },
  },
});
application.mount("#application");
