(each ['00000', '000000']
    (function (prefix)
        (console.log 'Lowest number for an AdventCoin starting with "%s" is %d' prefix
            (loop (result secret i md5) (null 'yzbqklnj' 1 (require 'js-md5'))
                (var result (md5 (+ secret i)))
                (if (= (result.substring 0 prefix.length) prefix)
                    i
                    (recur result secret ++i md5)
                )
            )
        )

    )
)
