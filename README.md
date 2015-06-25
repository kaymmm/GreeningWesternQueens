
# Greening Western Queens

## A simple page built with the Google Maps API and GeoXML

[View the Map](https://kaymmm.github.io/GreeningWesternQueens)

This is an interactive map that shows the locations of projects funded by North Star Fund's [Greening Western Queens Fund](https://northstarfund.org/grants-programs/partnerships/greening-western-queens).

It was originally created in 2011 to help publicize the program and to visualize proposed projects in relation to the area affected by the 2006 electrical power outage in Western Queens. In 2012, the map was updated to show the projects selected in the first funding round, as well as additional projects proposed for the second round of funding.

While the project concluded in 2012, I recently updated the map's backend to remain functional since Google has updated their map service and the original map will cease to function correctly once Google terminates some of their old services.

The map was developed using the Google Maps API v3, along with a modified version of the [GeoXML-v3 library](https://code.google.com/p/geoxml-v3/).

### Address Checker Tool

[View the Tool](https://kaymmm.github.io/GreeningWesternQueens/gwq_check.html)

In addition to the map, I also created a very basic tool to quickly check to see whether an address was located within the recognized outage areas (that I also determined using ConEd transformer data).

This tool also uses the Google Maps API to geocode the address and calculate the intersection of the address with the outage areas.
