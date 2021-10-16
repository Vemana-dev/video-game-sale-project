import define1 from "./a2166040e5fb39a6@229.js";
import define2 from "./a2e58f97fd5e8d7c@669.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["vgsales.csv",new URL("./vgsales.csv",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Video Game Sales
`
)});
  main.variable(observer("viewof selected_sales")).define("viewof selected_sales", ["Select"], function(Select){return(
Select(["global_sales", "eu_sales", "na_sales", "jp_sales"], {value: "global_sales", label: "Sales"})
)});
  main.variable(observer("selected_sales")).define("selected_sales", ["Generators", "viewof selected_sales"], (G, _) => G.input(_));
  main.variable(observer("viewof dashboard")).define("viewof dashboard", ["embed","data","width","colors","selected_sales","sales_titles"], function(embed,data,width,colors,selected_sales,sales_titles){return(
embed(
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "values": data
  },
  "transform": [
     {"filter": {"field": "year_label", "valid": true} },
     {"filter": {"field": "year_label", "lt": 2017} },
  ],
  "hconcat": [
    {
    "vconcat": [
      {
      "layer": [{
        "width": width - 280,
        "height": 130,
        "mark": {
          "type": "bar",
          "fill": "#a8a8a8",
          "cursor": "pointer"
        },
        "encoding": {
          "x": {"field": "year_label", "type": "ordinal", 'axis': {'labelAngle': 0}, "title": null},
          "y": {"field": "global_sales", "type": "quantitative", "aggregate": "sum"},
        },
        "config": {
          "scale": {
            "bandPaddingInner": 0.2
          }
        }
      },
      {
        "width": width - 280,
        "height": 130,
        "selection": {
          "brush": {"type": "interval", "encodings": ["x"]}
        },
        "mark": {
          "type": "bar",
          "fill": colors[selected_sales],
          "cursor": "pointer"
        },
        "encoding": {
          "x": {"field": "year_label", "type": "ordinal", 'axis': {'labelAngle': 0}, "title": null},
          "y": {"field": selected_sales, "type": "quantitative", "aggregate": "sum", "title": sales_titles[selected_sales], "axis": {"orient": "left"}},
        },
        "config": {
          "scale": {
            "bandPaddingInner": 0.2
          }
        }
      }]
    },
    /*{
      "transform": [
        {"fold": ["global_sales", "na_sales", "eu_sales", "jp_sales"]}
      ],
      "selection": {
        "brush": {"type": "interval", "encodings": ["x"]}
      },
      "width": width - 280,
      "height": 130,
      "mark": "bar",
      "encoding": {
        "x": {"field": "year_label", "type": "ordinal", 'axis': {'labelAngle': 0}, "title": null},
        "y": {
          "field": "value",
          "aggregate": "sum",
          "type": "quantitative"
        },
        "color": {
          "field": "key",
          "type": "nominal",
          "scale": {
            "domain": ["global_sales", "na_sales", "eu_sales", "jp_sales"],
            "range": ["#e7ba52", "#c7c7c7", "#aec7e8", "#1f77b4"]
          },
          "title": "Weather type"
        }
      }
    },*/
    {
      "data": {
        "values": [
          {"color": "#ff0000", "type": "Nintendo"},
          {"color": "#0c00ff", "type": "Sony"},
          {"color": "#008a0b", "type": "Microsoft"},
          {"color": colors[selected_sales], "type": "Other Publisher"}
        ]
      },
      "width": width - 280,
      "mark": {"type": "point", "size": 150, "shape": "square", "filled": true, "opacity": 1, "tooltip": null},
      "encoding": {
        "x": {
          "field": "type",
          "type": "nominal",
          "axis": {"orient": "top", "title": null, "labelAngle": 0},
          "tooltip": null
        },
        "color": {"field": "color", "type": "nominal", "legend": null, "scale": null}
      }
    },
    {
      "transform": [
         {"filter": {"selection": "brush"} },
         {"filter": {"field": "year_label", "valid": true} },
         {
          "aggregate": [
            {"op": "count", "as": "publisher_count"},
            {"op": "max", "field": selected_sales, "as": "best_game_sales"},
            {"op": "sum", "field": selected_sales, "as": "sales_sum"},
            {
              "op": "argmax",
              "field": selected_sales,
              "as": "argmax_sales"
            },
            {"op": "max", "field": "popular", "as": "popular_publisher"},
          ],
          "groupby": ["publisher"]
         }
      ],
      "width": width - 280,
      "height": 405,
      "selection": {
        "grid": {
          "type": "interval", "bind": "scales"
        },
        "highlight_circle": {"type": "single", "empty": "none", "on": "mouseover"}
      },
      "mark": {
        "type": "circle",
        "size": 200
      },
      "encoding": {
        "x": {"field": "publisher_count", "type": "quantitative", "title": "Number of Games Published"},
        "y": {"type": "quantitative", "field": "sales_sum", "title": sales_titles[selected_sales], "axis": {"orient": "left"}},
        "color": {
          "field": "popular_publisher", 
          "type": "nominal", 
          "scale": {"range": [
            colors[selected_sales],
            "#ff0000",
            "#0c00ff",
            "#00a806"
          ]},
          "legend": null
        },
        "size": {
            "condition": [
              {"selection": "highlight_circle", "value": 500}
            ],
            "value": 200
        },
        "tooltip": [
          {"field": "publisher", "type": "nominal", "title": "Publisher"},
          {"field": "sales_sum", "type": "quantitative", "title": "Total sales"},
          {"field": "publisher_count", "type": "quantitative", "title": "Games published"},
          {"field": "argmax_sales[name]", "type": "nominal", "title": "Bestselling game"},
          {"field": "best_game_sales", "type": "quantitative", "title": "Bestselling game sales"}
        ]
      }
    }]},
    {
    "vconcat": [{
    "transform": [
       {"filter": {"field": "year_label", "valid": true} },
       {"filter": {"selection": "brush"} },
    ],
    "layer": [
      {
        "title": "North America Sales",
        "width": 45,
        "height": 175,
        "mark": {
          "type": "bar",
          "fill": "#a8a8a8"
        },
        "encoding": {
          "y": {"field": "year_label", "type": "nominal", "axis": {"labelAngle": 0}, "title": null, "axis": {"labelOverlap": "true"}},
          "x": {"field": "global_sales", "type": "quantitative", "aggregate": "sum", "title": null}
        },
    },
    {
        "width": 45,
        "height": 175,
        "mark": {
          "type": "bar",
          "fill": "#77d1ce"
        },
        "encoding": {
          "y": {"field": "year_label", "type": "nominal", "axis": {"labelAngle": 0}, "title": null, "axis": {"labelOverlap": "true"}},
          "x": {"field": "na_sales", "type": "quantitative", "aggregate": "sum"}
        }
    }]
    },
    {
    "transform": [
       {"filter": {"field": "year_label", "valid": true} },
       {"filter": {"selection": "brush"} },
    ],
    "layer": [
      {
        "title": "Europe Sales",
        "width": 45,
        "height": 175,
        "mark": {
          "type": "bar",
          "fill": "#a8a8a8"
        },
        "encoding": {
          "y": {"field": "year_label", "type": "nominal", "axis": {"labelAngle": 0}, "title": null, "axis": {"labelOverlap": "true"}},
          "x": {"field": "global_sales", "type": "quantitative", "aggregate": "sum", "title": null}
        },
    },
    {
        "width": 45,
        "height": 175,
        "mark": {
          "type": "bar",
          "fill": "#dba6e3"
        },
        "encoding": {
          "y": {"field": "year_label", "type": "nominal", "axis": {"labelAngle": 0}, "title": null, "axis": {"labelOverlap": "true"}},
          "x": {"field": "eu_sales", "type": "quantitative", "aggregate": "sum"}
        }
    }]
    },
    {
    "transform": [
       {"filter": {"field": "year_label", "valid": true} },
       {"filter": {"selection": "brush"} },
    ],
    "layer": [
      {
        "title": "Japan Sales",
        "width": 45,
        "height": 175,
        "mark": {
          "type": "bar",
          "fill": "#a8a8a8"
        },
        "encoding": {
          "y": {"field": "year_label", "type": "nominal", "axis": {"labelAngle": 0}, "title": null, "axis": {"labelOverlap": "true"}},
          "x": {"field": "global_sales", "type": "quantitative", "aggregate": "sum", "title": null}
        },
    },
    {
        "width": 45,
        "height": 175,
        "mark": {
          "type": "bar",
          "fill": "#ffb95e"
        },
        "encoding": {
          "y": {"field": "year_label", "type": "nominal", "axis": {"labelAngle": 0}, "title": null, "axis": {"labelOverlap": "true"}},
          "x": {"field": "jp_sales", "type": "quantitative", "aggregate": "sum"}
        }
    }]
    }]
    }
  ]
}, {"actions": false})
)});
  main.variable(observer("dashboard")).define("dashboard", ["Generators", "viewof dashboard"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`


`
)});
  main.variable(observer()).define(["md"], function(md){return(
md``
)});
  main.variable(observer()).define(["md"], function(md){return(
md``
)});
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("vgsales.csv").text(), function(d) {
  return {
    rank: d["Rank"],
    name: d["Name"],
    platform: d["Platform"],
    year: d3.timeParse("%Y")(d["Year"]),
    year_label: parseInt(d["Year"]),
    genre: d["Genre"],
    publisher: d["Publisher"],
    na_sales: parseFloat(d["NA_Sales"]),
    eu_sales: parseFloat(d["EU_Sales"]),
    jp_sales: parseFloat(d["JP_Sales"]),
    other_sales: parseFloat(d["Other_Sales"]),
    global_sales: parseFloat(d["Global_Sales"])
  };
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md``
)});
  main.variable(observer()).define(["data"], function(data){return(
data.sort(function (a, b) {
    return a.year - b.year;
})
)});
  main.variable(observer()).define(["md"], function(md){return(
md``
)});
  main.variable(observer("popular_publishers")).define("popular_publishers", function(){return(
new Set(["Capcom", "Konami Digital Entertainment", "Namco Bandai Games", "Sega"])
)});
  main.variable(observer("updated_data")).define("updated_data", ["data"], function(data)
{
  data.forEach(function (arrayItem) {
    if (arrayItem.publisher == "Nintendo")
      arrayItem.popular = 2;
    else if (arrayItem.publisher == "Sony Computer Entertainment")
      arrayItem.popular = 3;
    else if (arrayItem.publisher == "Microsoft Game Studios")
      arrayItem.popular = 4;
    else
      arrayItem.popular = 0;
  });
  
  return data;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md``
)});
  main.variable(observer("colors")).define("colors", function(){return(
{
  global_sales: "#4682b4",
  na_sales: "#77d1ce",
  eu_sales: "#dba6e3",
  jp_sales: "#ffb95e"
}
)});
  main.variable(observer("axis_titles")).define("axis_titles", function(){return(
{
  global_sales: "Global Sales (Millions)",
  na_sales: "Global Sales from North America (Millions)",
  eu_sales: "Global Sales from Europe (Millions)",
  jp_sales: "Global Sales from Japan (Millions)"
}
)});
  main.variable(observer("sales_titles")).define("sales_titles", function(){return(
{
  global_sales: "Global Sales (Millions)",
  na_sales: "North America Sales (Millions)",
  eu_sales: "Europe Sales (Millions)",
  jp_sales: "Japan Sales (Millions)"
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md``
)});
  main.variable(observer("embed")).define("embed", ["require"], function(require){return(
require("vega-embed@4")
)});
  const child1 = runtime.module(define1);
  main.import("uniqueValid", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  const child2 = runtime.module(define2);
  main.import("Select", child2);
  main.variable(observer("Inputs")).define("Inputs", ["require"], function(require){return(
require("@observablehq/inputs@0.7.17/dist/inputs.umd.min.js")
)});
  main.variable(observer("Range")).define("Range", ["Inputs"], function(Inputs){return(
Inputs.Range
)});
  return main;
}
