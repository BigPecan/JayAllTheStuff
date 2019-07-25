import * as allStrings from "./strings";
import { settingsStorage } from "settings";

function settingsComponent(props) {
  let myLocale = props.settings.locale
  let strings = allStrings.getStrings(myLocale);
  // console.log(JSON.stringify(props));
  let colourSet = [
  {color: "#FF00FF"},   
  {color: "#FFFF00"},  
  {color: "#00FFFF"},  
  {color: "#FF0000"},  
  {color: "#00FF00"},  
  {color: "#0000FF"},  
    
  {color: "white"} ,
  {color: 'black'},
  {color: 'cornsilk'},
  {color: 'gold'},
  {color: 'aquamarine'},
  {color: 'deepskyblue'},
     
  {color: 'teal'},
  {color: 'violet'},
  {color: 'midnightblue'},
  {color: 'yellowgreen'},
  {color: 'crimson'},
  {color: 'lightseagreen'},
    
  {color: 'salmon'},
  {color: '#00FA9A'},  
  {color: 'darkred'},  
  {color: 'darkslategrey'},      
  {color: 'darkorchid'},
  {color: 'darkorange'},
    
  {color: 'lightsteelblue'},
  {color: 'skyblue'},
  {color: '#8B4513'},
  {color: 'khaki'}, 
  {color: 'palegoldenrod'},  
  {color: 'navy'},
    
  {color: 'deeppink'},
  {color: 'royalblue'},
  {color: 'orangered'},
  {color: 'greenyellow'}, 
  {color: 'tomato'},  
  {color: 'forestgreen'},
    
  {color: '#00163a'},
  {color: '#21003a'},
  {color: '#3a1d00'},
  {color: '#969696'}, 
  {color: '#494949'}, 
  {color: '#2d2d2d'}
];  
  
  const settingsModel = {
    useCelsius: false,
    userAPIKey: { name: "" },
    weatherError: null
  };
  var { settings } = props;

  // make sure there are defaul settings
  settings = Object.assign({}, settingsModel, settings);
  console.log(JSON.stringify(settings));

  return (
    <Page>
      <Section title="Localisation">
        <Select label="Distance Unit" settingsKey="distanceUnit" options={[ {value:"m", name:"meters"}, {value:"km", name:"kilometers"}, {value:"ft", name:"feet"}, {value:"mi", name:"miles"} ]} />
        <Select label="Date Format" settingsKey="dateFormat" options={[ {value:"dd.mm.yy", name:"dd.mm.yy"}, {value:"dd mmm yy", name:"dd mmm yy"}, {value:"dd mmmm yy", name:"dd mmmm yy"}, {value:"dd/mm/yy", name:"dd/mm/yy"}, {value:"mm.dd.yy", name:"mm.dd.yy"}, {value:"mmm dd yy", name:"mmm dd yy"}, {value:"mmmm dd yy", name:"mmmm dd yy"} ]} />
        <Select label="Time Format" settingsKey="timeFormat" options={[ {value:"auto", name:"Automatic (Use Fitbit Setting)"}, {value:"12h", name:"12 hour"}, {value:"24h", name:"24 hour"} ]} />
      </Section>      
      <Section
        title={
          <Text bold align="center">
            App Settings
          </Text>
        }
      />
      <Section
        title={
          <Text bold align="center">
            Weather
          </Text>
        }
      >
        <Text align="left">Temperature Unit: F° or C°</Text>
        <Toggle
          settingsKey="useCelsius"
          label={`Currently set to: ${settings.useCelsius ? "C°" : "F°"}`}
        />

        <Text align="left">
          In order to keep this clockface 100% free users will have to signup
          for a free{" "}
          <Link source="https://openweathermap.org/api">
            OpenWeatherMap API key
          </Link>
        </Text>
        <TextInput label="Enter OpenWeatherMap API key here:" settingsKey="userAPIKey" />

        <Text>{settings.userAPIKey.name || ""}</Text>

        {settings.weatherError && <Text>Weather API error: {settings.weatherError}</Text>}
      </Section>
      <Section
        title={
          <Text bold align="center">
            Clock
          </Text>
        }
      >
        <Toggle settingsKey="isAmPm" label="AM/PM indication on 12-hour clock" />      
        <Toggle settingsKey="showSeconds" label="Show seconds value" />
        <Toggle settingsKey="showLeadingZero" label="Show leading zero on hours" />
        <Toggle settingsKey="batteryToggle" label={strings["Battery Bar"]} />
      </Section>
      <Section title="Time colour">
        <ColorSelect settingsKey="timeColour" colors={colourSet} />
      </Section>
      
      <Section title="Date colour">
        <ColorSelect settingsKey="dateColour" colors={colourSet} />
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
