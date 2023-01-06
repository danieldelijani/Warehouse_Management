# Warehouse Management
A full-stack web application to manage warehouse inventory. Users can drop JSON objects into a storage account on Microsoft Azure, after which a database will be updated and the user can view all of their warehouse's updated inventory.

The front-end is developed with React, the backend is developed with Flask, and the database is MongoDB. All components of the application are hosted and deployed on Microsoft Azure, and the backend utilzes a serverless architecture.

The overall application architecture is represented with the following diagram:

![Application Architecture](/README_Resources/Architecture%20Diagram.png "Application Architecture")

Here is an example storage document that a user can drop into his/her account:

![Example Storage Document](/README_Resources/ExampleStorageDocument.png "Example Storage Document")

The swagger for the APIs developed for the application is as follows:

![Swagger](/README_Resources/Swagger.png "Swagger")