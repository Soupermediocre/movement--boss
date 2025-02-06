namespace SpriteKind {
    export const Plat = SpriteKind.create()
    export const Boss = SpriteKind.create()
}
function Shoot_Projectile () {
    for (let index = 0; index < 5; index++) {
        BossProjectile = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . 7 7 7 7 7 . . . . . . 
            . . . . 7 7 7 7 7 7 7 . . . . . 
            . . . 7 7 7 7 7 7 7 7 7 . . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
            . . 7 7 7 7 7 7 7 7 7 7 7 . . . 
            . . . 7 7 7 7 7 7 7 7 7 . . . . 
            . . . . 7 7 7 7 7 7 7 . . . . . 
            . . . . . 7 7 7 7 7 . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Projectile)
        BossProjectile.setFlag(SpriteFlag.GhostThroughWalls, true)
        BossProjectile.setFlag(SpriteFlag.AutoDestroy, true)
        BossProjectile.setPosition(Boss.x, Boss.y)
        BossProjectile.setVelocity(randint(-100, 100), randint(-100, 100))
        timer.after(500, function () {
            for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
                spriteutils.setVelocityAtAngle(value, spriteutils.angleFrom(value, tempHitbox), randint(200, 300))
            }
        })
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(Cooldown)) {
        Cooldown = true
        controller.moveSprite(tempHitbox, 0, 0)
        Immunity = true
        tempHitbox.setFlag(SpriteFlag.GhostThroughWalls, true)
        spriteutils.setVelocityAtAngle(tempHitbox, spriteutils.angleFrom(tempHitbox, Boss), 200)
        tempHitbox.ay = 0
        timer.after(500, function () {
            Immunity = false
            tempHitbox.ay = 120
            tempHitbox.setFlag(SpriteFlag.GhostThroughWalls, false)
            controller.moveSprite(tempHitbox, 100, 0)
            timer.after(5000, function () {
                Cooldown = false
            })
        })
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (JumpsLeft > 0) {
        tempHitbox.vy = -100
        JumpsLeft += -1
    }
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    let Return_Wall_Array2: tiles.Location[] = []
    for (let value of Return_Wall_Array2) {
        tiles.setWallAt(value, true)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
	
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (!(Immunity)) {
        sprites.destroy(otherSprite)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (!(Immunity)) {
        info.changeLifeBy(-5)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (tempHitbox.tileKindAt(TileDirection.Bottom, assets.tile`myTile3`)) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(tempHitbox.tilemapLocation().column + -1, tempHitbox.tilemapLocation().row + 1), assets.tile`myTile3`)) {
            tiles.setWallAt(tiles.getTileLocation(tempHitbox.tilemapLocation().column + -1, tempHitbox.tilemapLocation().row + 1), false)
            Return_Wall_Array.push(tiles.getTileLocation(tempHitbox.tilemapLocation().column + -1, tempHitbox.tilemapLocation().row + 1))
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(tempHitbox.tilemapLocation().column + 0, tempHitbox.tilemapLocation().row + 1), assets.tile`myTile3`)) {
            tiles.setWallAt(tiles.getTileLocation(tempHitbox.tilemapLocation().column + 0, tempHitbox.tilemapLocation().row + 1), false)
            Return_Wall_Array.push(tiles.getTileLocation(tempHitbox.tilemapLocation().column + 0, tempHitbox.tilemapLocation().row + 1))
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(tempHitbox.tilemapLocation().column + 1, tempHitbox.tilemapLocation().row + 1), assets.tile`myTile3`)) {
            tiles.setWallAt(tiles.getTileLocation(tempHitbox.tilemapLocation().column + 1, tempHitbox.tilemapLocation().row + 1), false)
            Return_Wall_Array.push(tiles.getTileLocation(tempHitbox.tilemapLocation().column + 1, tempHitbox.tilemapLocation().row + 1))
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (!(Immunity)) {
        info.changeLifeBy(-1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Boss, function (sprite, otherSprite) {
    if (!(Immunity)) {
        info.changeLifeBy(-1)
    }
})
let ColumnWallOff = 0
let Spike: Sprite = null
let OnGround = false
let DistV = 0
let Return_Wall_Array: tiles.Location[] = []
let JumpsLeft = 0
let Immunity = false
let Cooldown = false
let BossProjectile: Sprite = null
let Boss: Sprite = null
let tempHitbox: Sprite = null
namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}
tiles.setCurrentTilemap(tilemap`level`)
tempHitbox = sprites.create(img`
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, SpriteKind.Player)
tiles.placeOnRandomTile(tempHitbox, assets.tile`myTile3`)
tempHitbox.y += -16
tempHitbox.ay = 120
controller.moveSprite(tempHitbox, 100, 0)
Boss = sprites.create(assets.image`myImage1`, SpriteKind.Boss)
Boss.setFlag(SpriteFlag.GhostThroughWalls, true)
Boss.setFlag(SpriteFlag.StayInScreen, true)
tempHitbox.setFlag(SpriteFlag.StayInScreen, true)
Boss.setFlag(SpriteFlag.BounceOnWall, true)
info.setLife(500)
animation.runImageAnimation(
Boss,
assets.animation`myAnim`,
100,
true
)
let FlyMode = false
if (FlyMode) {
    tiles.setCurrentTilemap(tilemap`level0`)
}
game.onUpdateInterval(2000, function () {
    if (Math.percentChance(50)) {
        Shoot_Projectile()
    } else {
        if (Math.percentChance(50)) {
            animation.stopAnimation(animation.AnimationTypes.All, Boss)
            animation.runImageAnimation(
            Boss,
            assets.animation`myAnim0`,
            100,
            false
            )
            timer.after(400, function () {
                spriteutils.setVelocityAtAngle(Boss, spriteutils.angleFrom(Boss, tempHitbox), 200)
                animation.runImageAnimation(
                Boss,
                assets.animation`myAnim`,
                100,
                true
                )
                timer.after(500, function () {
                    for (let index = 0; index < 8; index++) {
                        timer.background(function () {
                            Boss.vx = Boss.vx / 2
                            Boss.vy = Boss.vy / 2
                            pause(100)
                        })
                    }
                })
            })
        } else {
            animation.stopAnimation(animation.AnimationTypes.All, Boss)
            animation.runImageAnimation(
            Boss,
            assets.animation`myAnim0`,
            100,
            false
            )
            timer.after(400, function () {
                animation.runImageAnimation(
                Boss,
                assets.animation`myAnim`,
                100,
                true
                )
                DistV = spriteutils.distanceBetween(Boss, tempHitbox) / 200
                spriteutils.setVelocityAtAngle(Boss, spriteutils.angleFrom(Boss, spriteutils.pos(tempHitbox.x + tempHitbox.vx * DistV, tempHitbox.y + tempHitbox.vy * DistV)), 200)
                timer.after(500, function () {
                    for (let index = 0; index < 8; index++) {
                        timer.background(function () {
                            Boss.vx = Boss.vx / 2
                            Boss.vy = Boss.vy / 2
                            pause(100)
                        })
                    }
                })
            })
        }
    }
})
forever(function () {
    if (tempHitbox.isHittingTile(CollisionDirection.Bottom)) {
        OnGround = true
        if (FlyMode) {
            JumpsLeft = 9999
        } else {
            JumpsLeft = 2
        }
    } else {
        OnGround = false
    }
})
forever(function () {
    if (Math.percentChance(1)) {
        Spike = sprites.create(assets.image`myImage0`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(Spike, assets.tile`myTile`)
        Spike.z = -20
        for (let index = 0; index < 16; index++) {
            if (!(spriteutils.isDestroyed(Spike))) {
                Spike.y += -1
                pause(50)
            }
        }
    }
})
forever(function () {
    if (controller.down.isPressed()) {
        if (tempHitbox.vy < 50) {
            tempHitbox.vy = 50
        }
    }
})
forever(function () {
    if (tempHitbox.tileKindAt(TileDirection.Top, assets.tile`myTile3`)) {
        ColumnWallOff = 0
        for (let index = 0; index < 20; index++) {
            if (tiles.tileAtLocationEquals(tiles.getTileLocation(0 + ColumnWallOff, tempHitbox.tilemapLocation().row + -1), assets.tile`myTile3`)) {
                tiles.setWallAt(tiles.getTileLocation(0 + ColumnWallOff, tempHitbox.tilemapLocation().row + -1), false)
                Return_Wall_Array.push(tiles.getTileLocation(0 + ColumnWallOff, tempHitbox.tilemapLocation().row + -1))
            }
            ColumnWallOff += 1
        }
        pauseUntil(() => tempHitbox.tileKindAt(TileDirection.Bottom, assets.tile`myTile3`) || tempHitbox.tileKindAt(TileDirection.Bottom, assets.tile`myTile`))
        for (let value of Return_Wall_Array) {
            tiles.setWallAt(value, true)
        }
    }
})
forever(function () {
	
})
