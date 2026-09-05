import type { VehicleType } from "./types";

export type VehicleCategoryDefinition = {
  id: string;
  name: VehicleType;
  subcategories: string[];
};

export const vehicleCategories: VehicleCategoryDefinition[] = [
  {
    id: "two-wheeler",
    name: "Two Wheeler",
    subcategories: [
      "Motorcycle",
      "Scooter",
      "Moped",
      "Electric Two Wheeler",
      "Performance Motorcycle",
      "Premium Motorcycle",
    ],
  },

  {
    id: "three-wheeler",
    name: "Three Wheeler",
    subcategories: [
      "Passenger Auto",
      "Cargo Auto",
      "Electric Auto",
      "Special Purpose Three Wheeler",
    ],
  },

  {
    id: "passenger",
    name: "Passenger Vehicle",
    subcategories: [
      "Hatchback",
      "Sedan",
      "SUV",
      "MUV / MPV",
      "Crossover",
      "Coupe",
      "Convertible",
      "Luxury Vehicle",
    ],
  },

  {
    id: "commercial",
    name: "Commercial Vehicle",
    subcategories: [
      "Mini Truck",
      "Pickup",
      "Small Commercial Vehicle",
      "Light Commercial Vehicle",
      "Medium Commercial Vehicle",
      "Heavy Commercial Vehicle",
      "Truck",
      "Tipper",
      "Tractor Truck",
      "Special Utility Vehicle",
    ],
  },

  {
    id: "bus",
    name: "Bus",
    subcategories: [
      "Mini Bus",
      "Midi Bus",
      "School Bus",
      "Staff Bus",
      "City Bus",
      "Intercity Bus",
      "Tourist Bus",
      "Luxury Bus",
      "Electric Bus",
      "Bus Chassis",
    ],
  },

  {
    id: "chassis",
    name: "Chassis",
    subcategories: [
      "Truck Chassis",
      "Bus Chassis",
      "LCV Chassis",
      "MCV Chassis",
      "HCV Chassis",
      "Pickup Chassis",
      "EV Chassis",
      "Special Purpose Chassis",
    ],
  },

  {
    id: "trailer",
    name: "Trailer",
    subcategories: [
      "Flatbed Trailer",
      "Container Trailer",
      "Tanker Trailer",
      "Tipper Trailer",
      "Car Carrier",
      "Refrigerated Trailer",
      "Low Bed Trailer",
      "Special Purpose Trailer",
      "Semi Trailer",
    ],
  },

  {
    id: "construction",
    name: "Construction Equipment",
    subcategories: [
      "Backhoe Loader",
      "Excavator",
      "Wheel Loader",
      "Motor Grader",
      "Road Roller",
      "Crane",
      "Concrete Mixer",
      "Concrete Pump",
      "Bulldozer",
      "Skid Steer Loader",
      "Compactor",
      "Other Construction Equipment",
    ],
  },

  {
    id: "agricultural",
    name: "Agricultural Equipment",
    subcategories: [
      "Tractor",
      "Mini Tractor",
      "Harvester",
      "Power Tiller",
      "Rotavator",
      "Thresher",
      "Agricultural Trailer",
      "Farm Implement",
      "Other Agricultural Equipment",
    ],
  },

  {
    id: "electric",
    name: "Electric Vehicle",
    subcategories: [
      "Electric Two Wheeler",
      "Electric Three Wheeler",
      "Electric Passenger Vehicle",
      "Electric LCV",
      "Electric Truck",
      "Electric Bus",
      "Electric Commercial Vehicle",
      "Other Electric Vehicle",
    ],
  },

  {
    id: "special-purpose",
    name: "Special Purpose Vehicle",
    subcategories: [
      "Ambulance",
      "Fire Tender",
      "Garbage Vehicle",
      "Water Tanker",
      "Refrigerated Vehicle",
      "Crane Vehicle",
      "Food Truck",
      "Mobile Workshop",
      "School Transport",
      "Other Special Purpose Vehicle",
    ],
  },
];

export const vehicleCategoryNames = vehicleCategories.map(
  (category) => category.name
);

export function getVehicleCategory(category: VehicleType) {
  return vehicleCategories.find(
    (item) => item.name === category
  );
}