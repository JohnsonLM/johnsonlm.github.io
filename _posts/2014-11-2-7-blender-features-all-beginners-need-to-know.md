Over the last year using Blender I’ve found some really useful shortcuts and features. so I though I would compile a short list of some of the most useful ones that I use almost everyday. This article is geared towards beginners but more experienced users could find they missed a few of these. Enjoy!

## 1. Hover Copy/Paste
![copy](/assets/tips-beginners/copy.png)
This one is the best of them all, if you read any of this read this! If you hover over a value or color and press CTRL C it will copy the value! No need to click on it and select it, just hover!

## 2. Random Node
![random1](/assets/tips-beginners/random1.png)
![random2](/assets/tips-beginners/random2.png)
The random node is an output from the “Object Info’ node found under the “Input” folder. The random node has unlimited possibilities. In the example I linked the random output to a color ramp node with 3 colors, then plugged that into an emission shader. And as you can see it randomly selects one of the colors for each object. Using the color ramp you can set any amount of colors for any amount of objects!

## 3. Progressive refine
![progressive](/assets/tips-beginners/progress.png)
Ever since I found out about progressive refine I never went back. Under the “Performance” tab in the “Render” panel, there’s this little check box. If you check it, instead of rendering each tile to make a full image, it renders the entire image one sample at a time. Which means if you set the sample count to 5000 then you can wait till you can’t see any more noise(At 1200 samples) and then stop the render! Believe me this is a huge time saver!


## 4. Render border
![border](/assets/tips-beginners/border.png)
When your using cycles you often want to use the preview renderer. Now when you got to rendered view most likely your computer starts to get sluggish.and for good reason! Its trying to render your entire scene in realtime! now to make this much faster just go to The “dimensions” tab and click the check box “Border” now you’ll see that if you go to camera view (CTRL ALT NUMPAD 0) its only rendering inside the camera! and if you press CTRL B you can drag a box around any area to render. Also the other check box “crop” will crop your render size to the border you have made.


## 5. Transparent Background
![trans](/assets/tips-beginners/trans.png)
One thing that I commonly need is a render with a transparent background. There are many way to do this. but this way only involves one click. Under the film tab there is a check-box called, you guessed it! “transparent”! check that and on all your renders it will replace the sky with transparency.


## 6. Matcaps
![matcaps](/assets/tips-beginners/matcaps.png)
Matcaps are perfect for sculpting and previewing you’re mesh in a render-like preview. To use them Press N to bring up the properties panel and scroll down to the “shading” tab and click “Matcap” then click on the Matcap and there will be a list of 24 unique Matcaps. Currently there is not a way to show custom Matcaps. But there is a workaround that allows you to. Ben Simonds explains how to do so Here


## 7. Lock Interface
![lock](/assets/tips-beginners/lock.jpg)
This feature is for speeding up renderings. There is a small lock icon in the render panel. It locks the interface when you hit render so that Blender doesn’t need to use memory for running the UI. I haven’t tested to see how much time it actually saves on render times, but I’m sure it could add up in large renders or animations.
