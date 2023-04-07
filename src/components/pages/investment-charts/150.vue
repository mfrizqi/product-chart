<template>
  <div>
    <Chart :chartValue="data" :productCode="'150'" />
  </div>
</template>

<script>
import Chart from "@/components/Chart.vue";

const example = [
    {
        "aum": 36126294502.66,
        "nav": 1173.8299,
        "code": "108",
        "nav_datetime": "2023-03-31T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36170799493.82,
        "nav": 1176.5419,
        "code": "108",
        "nav_datetime": "2023-03-30T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36407182279.11,
        "nav": 1184.2308,
        "code": "108",
        "nav_datetime": "2023-03-29T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35980985905.36,
        "nav": 1170.2118,
        "code": "108",
        "nav_datetime": "2023-03-28T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35624183859.02,
        "nav": 1158.653,
        "code": "108",
        "nav_datetime": "2023-03-27T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35797885406.69,
        "nav": 1165.9287,
        "code": "108",
        "nav_datetime": "2023-03-24T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35298169675.25,
        "nav": 1149.5702,
        "code": "108",
        "nav_datetime": "2023-03-21T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 34812294013.79,
        "nav": 1133.6916,
        "code": "108",
        "nav_datetime": "2023-03-20T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35113026090.14,
        "nav": 1143.4452,
        "code": "108",
        "nav_datetime": "2023-03-17T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 34577294442.55,
        "nav": 1125.0422,
        "code": "108",
        "nav_datetime": "2023-03-16T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 34805451266.49,
        "nav": 1132.1239,
        "code": "108",
        "nav_datetime": "2023-03-15T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35004289979.46,
        "nav": 1138.5288,
        "code": "108",
        "nav_datetime": "2023-03-14T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35749168338.48,
        "nav": 1162.0809,
        "code": "108",
        "nav_datetime": "2023-03-13T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35699677705.5,
        "nav": 1160.2016,
        "code": "108",
        "nav_datetime": "2023-03-10T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35935672503.5,
        "nav": 1167.7503,
        "code": "108",
        "nav_datetime": "2023-03-09T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35794109897.38,
        "nav": 1162.8881,
        "code": "108",
        "nav_datetime": "2023-03-08T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35731496279.8,
        "nav": 1160.7263,
        "code": "108",
        "nav_datetime": "2023-03-07T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35809872537.61,
        "nav": 1163.895,
        "code": "108",
        "nav_datetime": "2023-03-06T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35838549361.43,
        "nav": 1164.7846,
        "code": "108",
        "nav_datetime": "2023-03-03T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36136320049.92,
        "nav": 1174.5127,
        "code": "108",
        "nav_datetime": "2023-03-02T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36096568040.19,
        "nav": 1173.2639,
        "code": "108",
        "nav_datetime": "2023-03-01T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36021631135.06,
        "nav": 1170.8347,
        "code": "108",
        "nav_datetime": "2023-02-28T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36183450815.39,
        "nav": 1176.0922,
        "code": "108",
        "nav_datetime": "2023-02-27T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36277040635.59,
        "nav": 1179.0472,
        "code": "108",
        "nav_datetime": "2023-02-24T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36246435416.07,
        "nav": 1177.6903,
        "code": "108",
        "nav_datetime": "2023-02-23T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36082660827.36,
        "nav": 1172.3396,
        "code": "108",
        "nav_datetime": "2023-02-22T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36533688745.9,
        "nav": 1187.0425,
        "code": "108",
        "nav_datetime": "2023-02-21T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36622062493.02,
        "nav": 1190.1639,
        "code": "108",
        "nav_datetime": "2023-02-20T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36512759847.39,
        "nav": 1187.2786,
        "code": "108",
        "nav_datetime": "2023-02-17T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36473695816.34,
        "nav": 1186.2393,
        "code": "108",
        "nav_datetime": "2023-02-16T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36637783691.65,
        "nav": 1191.4665,
        "code": "108",
        "nav_datetime": "2023-02-15T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36722997508.71,
        "nav": 1191.1844,
        "code": "108",
        "nav_datetime": "2023-02-14T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36499403039.04,
        "nav": 1184.4739,
        "code": "108",
        "nav_datetime": "2023-02-13T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36506911325.48,
        "nav": 1184.346,
        "code": "108",
        "nav_datetime": "2023-02-10T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36335930266.26,
        "nav": 1178.797,
        "code": "108",
        "nav_datetime": "2023-02-09T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36542269545.96,
        "nav": 1185.6311,
        "code": "108",
        "nav_datetime": "2023-02-08T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36442577542.12,
        "nav": 1182.5646,
        "code": "108",
        "nav_datetime": "2023-02-07T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36215065701.67,
        "nav": 1174.5458,
        "code": "108",
        "nav_datetime": "2023-02-06T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36397793829.98,
        "nav": 1180.3875,
        "code": "108",
        "nav_datetime": "2023-02-03T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36067966512.25,
        "nav": 1169.7268,
        "code": "108",
        "nav_datetime": "2023-02-02T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36906520898.33,
        "nav": 1168.6107,
        "code": "108",
        "nav_datetime": "2023-02-01T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36731933757.44,
        "nav": 1163.0888,
        "code": "108",
        "nav_datetime": "2023-01-31T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 37022934958.96,
        "nav": 1171.946,
        "code": "108",
        "nav_datetime": "2023-01-30T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 37121118731.22,
        "nav": 1174.8862,
        "code": "108",
        "nav_datetime": "2023-01-27T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36959559844.33,
        "nav": 1169.6938,
        "code": "108",
        "nav_datetime": "2023-01-26T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0.63
    },
    {
        "aum": 36614381412.11,
        "nav": 1158.6783,
        "code": "108",
        "nav_datetime": "2023-01-25T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36861992259.42,
        "nav": 1167.1003,
        "code": "108",
        "nav_datetime": "2023-01-24T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36960663003.12,
        "nav": 1170.2149,
        "code": "108",
        "nav_datetime": "2023-01-20T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36839586713.19,
        "nav": 1166.0482,
        "code": "108",
        "nav_datetime": "2023-01-19T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36575616579.99,
        "nav": 1157.6916,
        "code": "108",
        "nav_datetime": "2023-01-18T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36612704537.39,
        "nav": 1158.859,
        "code": "108",
        "nav_datetime": "2023-01-17T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36198167435.46,
        "nav": 1143.0404,
        "code": "108",
        "nav_datetime": "2023-01-16T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35954186073.13,
        "nav": 1134.5076,
        "code": "108",
        "nav_datetime": "2023-01-13T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35975165545.75,
        "nav": 1136.7692,
        "code": "108",
        "nav_datetime": "2023-01-12T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35654058783.99,
        "nav": 1126.6382,
        "code": "108",
        "nav_datetime": "2023-01-11T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 35818692412.9,
        "nav": 1131.9811,
        "code": "108",
        "nav_datetime": "2023-01-10T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36334222419.31,
        "nav": 1147.6489,
        "code": "108",
        "nav_datetime": "2023-01-09T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36206183385.81,
        "nav": 1143.4597,
        "code": "108",
        "nav_datetime": "2023-01-06T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36068816956.37,
        "nav": 1139.3663,
        "code": "108",
        "nav_datetime": "2023-01-05T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36734514740.77,
        "nav": 1160.5528,
        "code": "108",
        "nav_datetime": "2023-01-04T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 37097510687,
        "nav": 1171.7483,
        "code": "108",
        "nav_datetime": "2023-01-03T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36727005179.21,
        "nav": 1160.0867,
        "code": "108",
        "nav_datetime": "2023-01-02T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    },
    {
        "aum": 36797223277.16,
        "nav": 1162.3175,
        "code": "108",
        "nav_datetime": "2022-12-30T00:00:00Z",
        "one_month": 0,
        "year_to_date": 0
    }
]

export default {
  components: {
    Chart,
  },
  data() {
    return {
      data: example,
    };
  },
};
</script>

<style></style>
