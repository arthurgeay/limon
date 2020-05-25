<?php
/**
 * Created by PhpStorm.
 * User: arthurgeay
 * Date: 25/05/2020
 * Time: 16:08
 */

namespace App\Services;

use Spipu\Html2Pdf\Html2Pdf;

class HTMLPDF
{
    private $pdf;

    public function create($orientation = null, $format = null, $lang = null, $unicode = null, $encoding = null, $margin = null)
    {
        $this->pdf = new Html2Pdf(
            $orientation ? $orientation : $this->orientation,
            $format ? $format : $this->format,
            $lang ? $lang : $this->lang,
            $unicode ? $unicode : $this->unicode,
            $encoding ? $encoding : $this->encoding,
            $margin ? $margin : $this->margin
        );
    }

    public function generatePdf($template, $name, $outputType = 'I')
    {
        $this->pdf->writeHTML($template);
        return $this->pdf->Output($name.'.pdf', $outputType);
    }
}